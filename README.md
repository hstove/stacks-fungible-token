# Stacks Fungible Token Standard

This repository is a simple example of a fungible token. It also defines the trait used in the Stacks Improvement Proposal (SIP) for fungible tokens.

- [Fungible token trait contract](./contracts/ft-trait.clar)
- [Example token that implements the trait](./contracts/example-token.clar)
- [Javascript client for interacting with the token](./clients/example-token-client.ts)
- [Unit tests for the contracts](./contracts/trait.test.ts)

## Credit

Credit for this code belongs to [@psq](https://github.com/psq), who wrote almost all of this code originally for use in his projects (such as [Flexr](https://github.com/psq/flexr)). This repository re-uses the core of his code, and presents it in a way that is easy to present as a possible standard.

## Comparison to ERC20

Many of the functions in this contract are built to follow industry best practices. For example, all functions and their signatures are similar to the ERC20 standard on Ethereum. However, the Stacks Blockchain and Clarity smart contracting language have built-in primitives for defining, transfering, and querying fungible tokens. As you can see, the code required to implement a fungible token is quite small.
