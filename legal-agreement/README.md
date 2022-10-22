# Simple Transaction - Clarity Contract

This contract enables the establishment of a legal agreement between 2 parties (promisor and promisee). The promisor is also the contract deployer and can set the document URL (preferably via IPFS). The promisee can get the URL and can then choose to agree or disagree.

- [Github Repo](https://github.com/thecodizt/ClarityProjects/tree/master/legal-agreement)
- [Github Gist](https://gist.github.com/thecodizt/6e847854e94aec7053544d2fa756c462)
- [Contract (Testnet)](https://explorer.stacks.co/txid/0x8555f44e999d5074975ac871a4939ae07008c7d63bef7beb9481b88d37866c7c?chain=testnet)

## Error Codes

| Error Code | Meaning |
| ---------- | ------- |
| 100 | Document not set yet |
| 101 | Document already set |
| 102 | Can't agree to your own document |
| 103 | Promisee already agreed |
| 104 | Promisee has not agreed |


## Documentation

### get-document-url

#### Input
None

#### Output
URL (string-utf8)

#### Description
This function retrieves the agreement document's URL

### get-promisee

#### Input
None

#### Output
Promisee address (principal)

#### Description
This function retrieves the address of the promisee

### set-document-url

#### Input
URL (string-utf8)

#### Output
Bool

#### Description
This function sets the agreement document's URL

### agree

#### Input
None

#### Output
Bool

#### Description
This function sets the promisee to the account calling the function

## Try it out

To try it out on your machine locally, follow the given commands. Make sure that clarinet is already installed.

```console
git clone https://github.com/thecodizt/ClarityProjects.git
cd ClarityProjects/legal-agreement
clarinet check
clarinet test
clarinet console
```

You are now ready to interact with the local implementation of the contract. Have fun!