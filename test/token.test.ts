import { TestProvider } from '@clarigen/test';
import { contracts, ExampleTokenContract, accounts } from '../src/clarigen';

let token: ExampleTokenContract;

const alice = 'ST3J2GVMMM2R07ZFBJDWTYEYAR8FZH5WKDTFJ9AHA';
const bob = 'ST1TWA18TSWGDAFZT377THRQQ451D1MSEM69C761';
const charlie = 'ST50GEWRE7W5B02G3J3K19GNDDAPC3XPZPYQRQDW';

beforeAll(async () => {
  const deployed = await TestProvider.fromContracts(contracts);

  token = deployed.exampleToken.contract;
});

test('Balances after minting are correct', async () => {
  expect((await token.getBalance(alice))._unsafeUnwrap()).toEqual(100000000000000);
  expect((await token.getBalance(bob))._unsafeUnwrap()).toEqual(100000000000000);
  expect((await token.getBalance(charlie))._unsafeUnwrap()).toEqual(12345);
});

test('Transfering tokens', async () => {
  await token.transfer(123, alice, bob, null).submit({ sender: alice });

  expect((await token.getBalance(alice))._unsafeUnwrap()).toEqual(99999999999877);
  expect((await token.getBalance(bob))._unsafeUnwrap()).toEqual(100000000000123);

  await token.transfer(100, bob, charlie, null).submit({ sender: bob });

  expect((await token.getBalance(charlie))._unsafeUnwrap()).toEqual(12445);

  expect((await token.getBalance(bob))._unsafeUnwrap()).toEqual(100000000000023);
});

test('total supply', async () => {
  const totalSupply = (await token.getTotalSupply())._unsafeUnwrap();
  expect(totalSupply).toEqual(200000000012345);

  const balancesResults = await Promise.all([
    token.getBalance(alice),
    token.getBalance(bob),
    token.getBalance(charlie),
  ]);

  const balances = balancesResults.map(r => r._unsafeUnwrap());

  const total = balances.reduce((prev, next) => prev + next);
  expect(totalSupply).toEqual(total);
});

test('name', async () => {
  const name = (await token.getName())._unsafeUnwrap();
  expect(name).toEqual('Example Token');
});

test('decimals', async () => {
  const decimals = (await token.getDecimals())._unsafeUnwrap();
  expect(decimals).toEqual(8);
});

test('symbol', async () => {
  const symbol = (await token.getSymbol())._unsafeUnwrap();
  expect(symbol).toEqual('EXAMPLE');
});

test('Cannot transfer more than your balance', async () => {
  const previousBalance = (await token.getBalance(charlie))._unsafeUnwrap();
  const tx = token.transfer(10000000000, charlie, bob, null);
  const result = await (await tx.submit({ sender: charlie })).getResult();
  if (result.isOk !== false) throw new Error('Expected error');
  expect(result.value).toEqual(1);
  expect((await token.getBalance(charlie))._unsafeUnwrap()).toEqual(previousBalance);
});

test('Cannot invoke transfer with "sender" different than tx-sender', async () => {
  const tx = token.transfer(10000000000, charlie, bob, null);
  const result = await (await tx.submit({ sender: alice })).getResult();
  if (result.isOk !== false) throw new Error('Expected error');
  expect(result.value).toEqual(4);
});
