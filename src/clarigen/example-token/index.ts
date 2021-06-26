import { proxy, BaseProvider, Contract } from '@clarigen/core';
import type { ExampleTokenContract } from './types';
import { ExampleTokenInterface } from './abi';
export type { ExampleTokenContract } from './types';

export const exampleTokenContract = (provider: BaseProvider) => {
  const contract = proxy<ExampleTokenContract>(ExampleTokenInterface, provider);
  return contract;
};

export const exampleTokenInfo: Contract<ExampleTokenContract> = {
  contract: exampleTokenContract,
  address: 'ST1HTBVD3JG9C05J7HBJTHGR0GGW7KXW28M5JS8QE',
  contractFile: 'contracts/example-token.clar',
};
