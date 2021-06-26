import { proxy, BaseProvider, Contract } from '@clarigen/core';
import type { FtTraitContract } from './types';
import { FtTraitInterface } from './abi';
export type { FtTraitContract } from './types';

export const ftTraitContract = (provider: BaseProvider) => {
  const contract = proxy<FtTraitContract>(FtTraitInterface, provider);
  return contract;
};

export const ftTraitInfo: Contract<FtTraitContract> = {
  contract: ftTraitContract,
  address: 'ST1HTBVD3JG9C05J7HBJTHGR0GGW7KXW28M5JS8QE',
  contractFile: 'contracts/ft-trait.clar',
};
