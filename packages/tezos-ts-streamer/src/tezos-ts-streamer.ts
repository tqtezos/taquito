import { SubscribeProvider } from '@tezos-ts/tezos-ts';
import * as WS from 'ws';

export class Subscription {
  constructor(private ws: WS) {}

  public on(type: 'error', cb: (error: Error) => void): void;
  // tslint:disable-next-line: unified-signatures
  public on(type: 'data', cb: (data: string) => void): void;
  public on(type: 'close', cb: () => void): void;

  public on(type: 'data' | 'error' | 'close', cb: any): void {
    switch (type) {
      case 'data':
        this.ws.on('message', cb);
        break;
      case 'error':
        this.ws.on('error', cb);
        break;
      case 'close':
        this.ws.on('close', cb);
        break;
      default:
        console.warn(`Trying to register on an unsupported event: ${type}`);
    }
  }

  public off(type: 'error', cb: (error: Error) => void): void;
  // tslint:disable-next-line: unified-signatures
  public off(type: 'data', cb: (data: string) => void): void;
  public off(type: 'close', cb: () => void): void;

  public off(type: 'data' | 'error' | 'close', cb: any): void {
    switch (type) {
      case 'data':
        this.ws.off('message', cb);
        break;
      case 'error':
        this.ws.off('error', cb);
        break;
      case 'close':
        this.ws.off('close', cb);
        break;
      default:
        console.warn(`Trying to unregister on an unsupported event: ${type}`);
    }
  }

  public close() {
    this.ws.close();
  }
}

export class StreamerProvider implements SubscribeProvider {
  constructor(private url: string) {}

  subscribe(_filter: 'head'): Subscription {
    const ws = new WS(this.url);
    return new Subscription(ws);
  }
}
