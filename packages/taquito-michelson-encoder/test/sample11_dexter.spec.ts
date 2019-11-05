import { Schema } from '../src/schema/storage';
import { storage as storageDexter, params, rpcContractResponse } from '../data/sample11_dexter';
import {
  storage as storageToken,
  params as paramsToken,
  rpcContractResponse as rpcToken,
} from '../data/sample11_token';
import BigNumber from 'bignumber.js';
import { ParameterSchema } from '../src/schema/parameter';
describe('Exchange contract test', () => {
  it('Test storage schema', () => {
    const schema = new Schema(storageDexter);
    expect(schema.ExtractSchema()).toEqual({
      '0': { address: 'nat' },
      '1': 'contract',
      '2': 'contract',
      '3': 'nat',
      '4': {
        address: {
          '0': {
            '0': 'nat',
            '1': 'nat',
            '2': 'timestamp',
          },
          '1': {
            '1': 'nat',
            '2': 'mutez',
            '3': 'nat',
            '4': 'timestamp',
          },
          '2': {
            '2': 'nat',
            '3': 'timestamp',
          },
          '3': {
            '3': 'nat',
            '4': 'mutez',
            '5': 'timestamp',
          },
        },
      },
    });
  });

  it('Test storage parsing', () => {
    const schema = new Schema(storageDexter);
    expect(schema.Execute(rpcContractResponse.script.storage)).toEqual({
      '0': {},
      '1': 'KT1XAMU1kn8EJLM2uqrP71Jevvkyo7yyfNTK',
      '2': 'KT1DmCHxit2bQ2GiHVc24McY6meuJPMTrqD8',
      '3': new BigNumber('100000000'),
      '4': {},
    });
  });

  it('Test storage encoding', () => {
    const schema = new Schema(storageDexter);
    expect(
      schema.Encode({
        '0': {},
        '1': 'KT1XAMU1kn8EJLM2uqrP71Jevvkyo7yyfNTK',
        '2': 'KT1DmCHxit2bQ2GiHVc24McY6meuJPMTrqD8',
        '3': new BigNumber('100000000'),
        '4': {},
      })
    ).toEqual({
      prim: 'Pair',
      args: [[], rpcContractResponse.script.storage.args[1]],
    });
  });

  it('Test parameter schema', () => {
    const schema = new ParameterSchema(params);
    expect(schema.ExtractSchema()).toEqual({
      '0': {
        '0': 'nat',
        '1': 'nat',
        '2': 'timestamp',
      },
      '1': {
        '1': 'nat',
        '2': 'mutez',
        '3': 'nat',
        '4': 'timestamp',
      },
      '2': {
        '2': 'nat',
        '3': 'timestamp',
      },
      '3': {
        '3': 'nat',
        '4': 'mutez',
        '5': 'timestamp',
      },
      '4': 'nat',
    });
  });

  it('Encode parameter properly func 0', () => {
    const schema = new ParameterSchema(params);
    expect(schema.Encode('0', 1, 2, 'timestamp')).toEqual({
      args: [
        {
          args: [
            {
              args: [{ int: '1' }, { args: [{ int: '2' }, { string: 'timestamp' }], prim: 'Pair' }],
              prim: 'Pair',
            },
          ],
          prim: 'Left',
        },
      ],
      prim: 'Left',
    });
  });

  it('Encode parameter properly func 1', () => {
    const schema = new ParameterSchema(params);
    expect(schema.Encode('1', 1, 2, 3, 'timestamp')).toEqual({
      args: [
        {
          args: [
            {
              args: [
                {
                  args: [
                    {
                      int: '1',
                    },
                    {
                      int: '2',
                    },
                  ],
                  prim: 'Pair',
                },
                {
                  args: [
                    {
                      int: '3',
                    },
                    {
                      string: 'timestamp',
                    },
                  ],
                  prim: 'Pair',
                },
              ],
              prim: 'Pair',
            },
          ],
          prim: 'Right',
        },
      ],
      prim: 'Left',
    });
  });

  it('Encode parameter properly func 2', () => {
    const schema = new ParameterSchema(params);
    expect(schema.Encode('2', 3, 'timestamp')).toEqual({
      args: [
        {
          args: [
            {
              args: [
                {
                  int: '3',
                },
                {
                  string: 'timestamp',
                },
              ],
              prim: 'Pair',
            },
          ],
          prim: 'Left',
        },
      ],
      prim: 'Right',
    });
  });

  it('Encode parameter properly func 3', () => {
    const schema = new ParameterSchema(params);
    expect(schema.Encode('3', 1, 3, 'timestamp')).toEqual({
      args: [
        {
          args: [
            {
              args: [
                {
                  args: [
                    {
                      int: '1',
                    },
                    {
                      args: [
                        {
                          int: '3',
                        },
                        {
                          string: 'timestamp',
                        },
                      ],
                      prim: 'Pair',
                    },
                  ],
                  prim: 'Pair',
                },
              ],
              prim: 'Left',
            },
          ],
          prim: 'Right',
        },
      ],
      prim: 'Right',
    });
  });

  it('Encode parameter properly func 4', () => {
    const schema = new ParameterSchema(params);
    expect(schema.Encode('4', 3)).toEqual({
      args: [
        {
          args: [
            {
              args: [
                {
                  int: '3',
                },
              ],
              prim: 'Right',
            },
          ],
          prim: 'Right',
        },
      ],
      prim: 'Right',
    });
  });
});

describe('Exchange contract test', () => {
  it('Test storage schema', () => {
    const schema = new Schema(storageToken);
    expect(schema.ExtractSchema()).toEqual({
      '0': {
        address: {
          '0': 'nat',
          '1': { address: 'nat' },
        },
      },
      '1': 'nat',
      '2': 'string',
      '3': 'string',
    });
  });

  it('Test storage parsing', () => {
    const schema = new Schema(storageToken);
    expect(schema.Execute(rpcToken.script.storage)).toEqual({
      '0': {},
      '1': new BigNumber('1000000'),
      '2': 'Tezos Gold',
      '3': 'TGD',
    });
  });

  it('Test parameter schema', () => {
    const schema = new ParameterSchema(paramsToken);
    expect(schema.ExtractSchema()).toEqual({
      '0': {
        '0': 'address',
        '1': 'address',
        '2': 'nat',
      },
      '1': 'address',
    });
  });

  it('Encode parameter properly func 0', () => {
    const schema = new ParameterSchema(paramsToken);
    expect(schema.Encode('0', 'address1', 'address2', '1')).toEqual({
      args: [
        {
          args: [
            {
              string: 'address1',
            },
            {
              args: [
                {
                  string: 'address2',
                },
                {
                  int: '1',
                },
              ],
              prim: 'Pair',
            },
          ],
          prim: 'Pair',
        },
      ],
      prim: 'Left',
    });
  });

  it('Encode parameter properly func 1', () => {
    const schema = new ParameterSchema(paramsToken);
    expect(schema.Encode('1', 'address1')).toEqual({
      args: [
        {
          string: 'address1',
        },
      ],
      prim: 'Right',
    });
  });
});
