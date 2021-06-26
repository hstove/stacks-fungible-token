import { ClarityTypes, Transaction } from '@clarigen/core';

// prettier-ignore
export interface ExampleTokenContract {
  getTokenUri: () => Transaction<string | null, null>;
  transfer: (amount: number, sender: string, recipient: string, memo: Buffer | null) => Transaction<boolean, number>;
  getBalance: (owner: string) => Promise<ClarityTypes.Response<number, null>>;
  getDecimals: () => Promise<ClarityTypes.Response<number, null>>;
  getName: () => Promise<ClarityTypes.Response<string, null>>;
  getSymbol: () => Promise<ClarityTypes.Response<string, null>>;
  getTotalSupply: () => Promise<ClarityTypes.Response<number, null>>;
}
