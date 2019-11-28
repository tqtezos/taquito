import { ConstructedOperation } from "@taquito/rpc";
import { Context } from "../context";
import { RPCOperation } from "../operations/types";
import { CounterPreparer } from "./preparers/counter";
import { FeeOpPreparer } from "./preparers/fee-op";
import { ProtoPreparer } from "./preparers/proto";
import { RevealPreparer } from "./preparers/reveal";
import { SourcePreparer } from "./preparers/source";
import { Preparer, PreparerContext } from "./types";

export class CombinedPreparer {

  constructor(private context: Context) { }

  private isValidConstructed(_op: any): _op is ConstructedOperation {
    return true;
  }

  private preparers: Preparer[] = [new RevealPreparer(), new SourcePreparer(), new CounterPreparer(), new FeeOpPreparer(), new ProtoPreparer()];

  async createContext(source: string): Promise<PreparerContext> {
    return {
      header: this.context.rpc.getBlockHeader(),
      metadata: this.context.rpc.getBlockMetadata(),
      context: this.context,
      source: Promise.resolve(source)
    }
  }

  async prepare(unPreparedOps: RPCOperation[], source: string) {
    const prepContext = await this.createContext(source);
    let constOps: RPCOperation[] = unPreparedOps;
    for (const prep of this.preparers) {
      constOps = await prep.prepare(unPreparedOps, prepContext);
    }

    if (!constOps.every((x) => this.isValidConstructed(x))) {
      throw new Error('Invalid ops');
    }

    const metadata = await prepContext.metadata;
    const header = await prepContext.header;

    const branch = header.hash;
    const contents = constOps as ConstructedOperation[];
    const protocol = metadata.next_protocol;

    return {
      branch,
      contents,
      protocol,
    };
  }
}
