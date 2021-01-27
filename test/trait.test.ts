import { Client, Provider, ProviderRegistry } from '@blockstack/clarity';
import { ExampleTokenClient, TransferError } from '../src/example-token-client';

let traitClient: Client;
let provider: Provider;
let exampleToken: ExampleTokenClient;

const alice = 'ST3J2GVMMM2R07ZFBJDWTYEYAR8FZH5WKDTFJ9AHA';
const bob = 'ST1TWA18TSWGDAFZT377THRQQ451D1MSEM69C761';
const charlie = 'ST50GEWRE7W5B02G3J3K19GNDDAPC3XPZPYQRQDW';

describe('Fungible token trait', () => {
  beforeAll(async () => {
    provider = await ProviderRegistry.createProvider();
    traitClient = new Client(
      'ST3J2GVMMM2R07ZFBJDWTYEYAR8FZH5WKDTFJ9AHA.ft-trait',
      'ft-trait',
      provider
    );
    exampleToken = new ExampleTokenClient(
      'ST3J2GVMMM2R07ZFBJDWTYEYAR8FZH5WKDTFJ9AHA',
      provider
    );
  });

  test('The contracts are valid', async () => {
    await traitClient.checkContract();
    await traitClient.deployContract();

    await exampleToken.checkContract();
    await exampleToken.deployContract();
  });

  describe('Using the contracts', () => {
    test('Balances after minting are correct', async () => {
      expect(await exampleToken.balanceOf(alice)).toEqual(100000000000000);
      expect(await exampleToken.balanceOf(bob)).toEqual(100000000000000);
      expect(await exampleToken.balanceOf(charlie)).toEqual(12345);
    });

    test('Transfering tokens', async () => {
      await exampleToken.transfer(bob, 123, { sender: alice });

      expect(await exampleToken.balanceOf(alice)).toEqual(99999999999877);
      expect(await exampleToken.balanceOf(bob)).toEqual(100000000000123);

      await exampleToken.transfer(charlie, 100, { sender: bob });

      expect(await exampleToken.balanceOf(charlie)).toEqual(12445);

      expect(await exampleToken.balanceOf(bob)).toEqual(100000000000023);
    });

    test('total supply', async () => {
      const totalSupply = await exampleToken.totalSupply();
      expect(totalSupply).toEqual(200000000012345);

      const balances = await Promise.all([
        exampleToken.balanceOf(alice),
        exampleToken.balanceOf(bob),
        exampleToken.balanceOf(charlie),
      ]);

      const total = balances.reduce((prev, next) => prev + next);
      expect(totalSupply).toEqual(total);
    });

    test('name', async () => {
      const name = await exampleToken.getName();
      expect(name).toEqual('Example Token');
    });

    test('decimals', async () => {
      const decimals = await exampleToken.decimals();
      expect(decimals).toEqual(8);
    });

    test('symbol', async () => {
      const symbol = await exampleToken.symbol();
      expect(symbol).toEqual('EXAMPLE');
    });

    test('Cannot transfer more than your balance', async () => {
      const previousBalance = await exampleToken.balanceOf(charlie);
      await expect(
        exampleToken.transfer(bob, 10000000000, { sender: charlie })
      ).rejects.toThrowError(new TransferError(1));
      expect(await exampleToken.balanceOf(charlie)).toEqual(previousBalance);
    });

    test('Cannot invoke transfer with "sender" different than tx-sender', async () => {
      await expect(
        exampleToken.transfer(bob, 10000000000, {
          sender: charlie,
          senderArg: alice,
        })
      ).rejects.toThrowError(new TransferError(4));
    });
  });
});
