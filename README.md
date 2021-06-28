# Stacks Fungible Token Standard

This repository is a simple example of a fungible token. It also defines the trait used in the [Stacks Improvement Proposal (SIP) for fungible tokens](https://github.com/stacksgov/sips/pull/5).

- [Fungible token trait contract](./contracts/ft-trait.clar)
- [Example token that implements the trait](./contracts/example-token.clar)
- [Unit tests for the contracts](./contracts/token.test.ts)

This project is already configured for use with [Clarigen](https://github.com/obylabs/clarigen) and [Clarinet](https://github.com/hirosystems/clarinet) to provide an optimal developer experience.

## Comparison to ERC20

Many of the functions in this contract are built to follow industry best practices. For example, all functions and their signatures are similar to the ERC20 standard on Ethereum. However, the Stacks Blockchain and Clarity smart contracting language have built-in primitives for defining, transfering, and querying fungible tokens. As you can see, the code required to implement a fungible token is quite small.

## Development

Feel free to fork this project and use it for your own token.

Run tests with `yarn test` or `yarn test --watch`

Run Clarinet scripts with `clarinet console` etc
