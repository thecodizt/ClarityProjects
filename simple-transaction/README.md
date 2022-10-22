# Simple Transaction - Clarity Contract

This contract enables the transfer of STX tokens from one account to another seamlessly.

- [Github Repo](https://github.com/thecodizt/ClarityProjects/tree/master/simple-transaction)
- [Github Gist](https://gist.github.com/thecodizt/23588df1db510a020ad82eb1da78a83d)
- [Contract (Testnet)](https://explorer.stacks.co/txid/0x07d347d9b719e5e02f170a1d2c17e9b82d1e79aa0021568edf1e5bf7c3bd1b75?chain=testnet)
- [Video Demo]()

## Error Codes

| Error Code | Meaning |
| ---------- | ------- |
| 100 | Sender has 0 account balance |
| 101 | Sender has less balance than the amount to be sent |

## Documentation

### get-sender-balance

#### Input
None

#### Output
Sender's balance (uint)

#### Description
This function retrieves the senders account balance.

### send-amount

#### Input
- receiver: (principal) Receiver address
- amount: (uint) Amount to send

#### Output
Boolean

#### Description
This function takes care of the actual transaction

## Try it out

To try it out on your machine locally, follow the given commands. Make sure that clarinet is already installed.

```console
git clone https://github.com/thecodizt/ClarityProjects.git
cd ClarityProjects/simple-transaction
clarinet check
clarinet test
clarinet console
```

You are now ready to interact with the local implementation of the contract. Have fun!