# Fundraiser - Clarity Contract

This contract enables anyone to fund a clarity contract and the received funds can later be transferred to a beneficiary.

- [Github Repo](https://github.com/thecodizt/ClarityProjects/tree/master/fundraiser)
- [Github Gist](https://gist.github.com/thecodizt/b04bfaa0975f5ea1c68eaa676cdf811a)
- [Contract (Testnet)](https://explorer.stacks.co/txid/0x06c8d594ba45604c2ed7a2e2190aa0883163e86946aa11173e1ea8df163e8167?chain=testnet)
- [Video Demo](https://youtu.be/pfxH0GthpIY)

## Error Codes

| Error Code | Meaning |
| ---------- | ------- |
| 100 | Action allowed only for contract owner |
| 101 | Fundraiser closed and doesn't accept funds anymore |

## Documentation

### get-balance

#### Input
None

#### Output
Current collection (uint)

#### Description
This function retrieves the current amount of funds collected

### fund

#### Input
- amount: (uint) Amount to send

#### Output
Boolean

#### Description
This function takes care of the actual transaction from the funder

### cash-out

#### Input
- beneficiary: (principal) Address of the beneficiary of the funds

#### Output
Boolean

#### Description
This function takes care of the sending all the recieved funds to the beneficiary

## Try it out

To try it out on your machine locally, follow the given commands. Make sure that clarinet is already installed.

```console
git clone https://github.com/thecodizt/ClarityProjects.git
cd ClarityProjects/fundraiser
clarinet check
clarinet test
clarinet console
```

You are now ready to interact with the local implementation of the contract. Have fun!