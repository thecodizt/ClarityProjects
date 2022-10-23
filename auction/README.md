# Auction- Clarity Contract

This contract enables a single item auction where a minimum bid can be set by the contract deployer and the product details can be provided via an URL (preferably via IPFS). Anyone can then bid on it and get the latest maximum bid. The contract deployer can then close the auction anytime they want after which the highest bidder can transfer the tokens for payment.

- [Github Repo](https://github.com/thecodizt/ClarityProjects/tree/master/auction)
- [Github Gist](https://gist.github.com/thecodizt/58137989b0a59fc96f4e3021eef0f0d9)
- [Contract (Testnet)](https://explorer.stacks.co/txid/0x31dce8c8b2868dd170ea36d7fa82024cf01227c4cbdb5777da953a81f1c03f38?chain=testnet)
- [Video Demo](https://youtu.be/fmP-bx2ij2M)

## Error Codes

| Error Code | Meaning |
| ---------- | ------- |
| 100 | No item to auction |
| 101 | Item already set and can't be changed |
| 102 | Feature only for seller |
| 103 | Minimum bid not set yet |
| 104 | Minimum bid already set|
| 105 | Trying bid on your own auction |
| 106 | Not enough balance to bid the said amount |
| 107 | Auction closed and can't bid anymore |
| 108 | Can't close auction because no bidder bid |
| 109 | Auction not closed yet |
| 110 | Only max bidder can purchase |


## Documentation

### get-auction-item-url

#### Input
None

#### Output
URL of the auction item (string-utf8)

#### Description
This function retrieves the auction item's URL.

### get-minimum-bid

#### Input
None

#### Output
Minimum bid amount for the auction (uint)

#### Description
This function retrieves the starting bid amount.

### get-current-max-bid

#### Input
None

#### Output
Current maximum bid (uint)

#### Description
This function retrieves the auction item's current highest bid.

### get-current-max-bidder

#### Input
None

#### Output
Current maximum bidder (principal)

#### Description
This function retrieves the auction item's current highest bidder (Contract owner only)

### get-bidder-balance

#### Input
None

#### Output
Bool

#### Description
This function checks if the bidder has enough balance

### is-item-sold

#### Input
None

#### Output
Bool

#### Description
This function checks if the item is sold

### set-auction-item-url

#### Input
URL (string-utf8)

#### Output
Bool

#### Description
This function sets the auction items URL

### set-minimum-bid

#### Input
Minimum amount (uint)

#### Output
Bool

#### Description
This function sets the starting amount for bidding

### bid-extra

#### Input
Extra amount (uint)

#### Output
Bool

#### Description
This function increases the current maximum bid by the amount specified by sender and sets maximum bidder to the sender as well

### close-auction

#### Input
None

#### Output
Bool

#### Description
This function closes the auction and prevents anu further bidding

### cash-out

#### Input
None

#### Output
Bool

#### Description
This function transacts the amount from maximum bidder to the seller (Maximum bidder only)

## Try it out

```console
git clone https://github.com/thecodizt/ClarityProjects.git
cd ClarityProjects/auction
clarinet check
clarinet test
clarinet console
```

You are now ready to interact with the local implementation of the contract. Have fun!