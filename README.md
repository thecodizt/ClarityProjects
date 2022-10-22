# Builders Edition Clarity Hackathon - Submission

A collection of 5 different Clarity contract has been built and deployed to the testnet as a part of the Hackathon. Complete Documentation for all the contracts can be found in their respective folders, the links to which are available below.

## 💫 Inspiration
Ever since I started learning about web3, I've always wondered why didn't anyone try adding the smart contract compatibility to the existing blockchain network rather than going all out and creating an entirely new network called Ethereum. Agreed that the PoW consenus used in the blockchain is slow and might have negative effects on the environment due to its high energy consumption, but it also boasts the biggest network. When I first came across Clarity and Stacks to say the least I was immediately hooked going on to spend an entire weekend vacation of 3 days from my university spending over 40 hours learning, building, testing and deploying any idea I could come up with. I was very much impressed by the techniques that were used by Stacks and its PoX consenus in making the blockchain network powerful and versatile enough to handle the loads of that comes with smart contract compatibility. I had built, tested and deployed over 10 different clarity projects in this span of 40 hours of which 5 were for practice, built following the book and the docs. The remaining 5 were built on my own ideas and are submitted for this hackathon. 

## 🛠 Contracts
Every single one of the following contracts have been tested throughly and deployed to the testnet. Their error codes and function descriptions can be found on the seperate repository links provided under their sections.

### 📇 Simple Transaction

This contract enables the transfer of STX tokens from one account to another seamlessly.

- [Github Repo](https://github.com/thecodizt/ClarityProjects/tree/master/simple-transaction)
- [Github Gist](https://gist.github.com/thecodizt/23588df1db510a020ad82eb1da78a83d)
- [Contract (Testnet)](https://explorer.stacks.co/txid/0x07d347d9b719e5e02f170a1d2c17e9b82d1e79aa0021568edf1e5bf7c3bd1b75?chain=testnet)
- [Video Demo]()

### 📇 Fundraiser

This contract enables anyone to fund a clarity contract and the received funds can later be transferred to a beneficiary.

- [Github Repo](https://github.com/thecodizt/ClarityProjects/tree/master/fundraiser)
- [Github Gist](https://gist.github.com/thecodizt/b04bfaa0975f5ea1c68eaa676cdf811a)
- [Contract (Testnet)](https://explorer.stacks.co/txid/0x06c8d594ba45604c2ed7a2e2190aa0883163e86946aa11173e1ea8df163e8167?chain=testnet)
- [Video Demo]()

### 📇 Auction

This contract enables a single item auction where a minimum bid can be set by the contract deployer and the product details can be provided via an URL (preferably via IPFS). Anyone can then bid on it and get the latest maximum bid. The contract deployer can then close the auction anytime they want after which the highest bidder can transfer the tokens for payment.

- [Github Repo](https://github.com/thecodizt/ClarityProjects/tree/master/auction)
- [Github Gist](https://gist.github.com/thecodizt/58137989b0a59fc96f4e3021eef0f0d9)
- [Contract (Testnet)](https://explorer.stacks.co/txid/0x31dce8c8b2868dd170ea36d7fa82024cf01227c4cbdb5777da953a81f1c03f38?chain=testnet)
- [Video Demo]()

### 📇 Legal Agreement

This contract enables the establishment of a legal agreement between 2 parties (promisor and promisee). The promisor is also the contract deployer and can set the document URL (preferably via IPFS). The promisee can get the URL and can then choose to agree or disagree.

- [Github Repo](https://github.com/thecodizt/ClarityProjects/tree/master/legal-agreement)
- [Github Gist](https://gist.github.com/thecodizt/6e847854e94aec7053544d2fa756c462)
- [Contract (Testnet)](https://explorer.stacks.co/txid/0x8555f44e999d5074975ac871a4939ae07008c7d63bef7beb9481b88d37866c7c?chain=testnet)
- [Video Demo]()

### 📇 Delivery Tracking

This contract enables the real-time tracking of a delivery where the sender, middlemen and reciever are all Principals and the sender alone can set the receiver address and the receiver can track who currently owns the package. Once the delivery is complete no more transfer of package can happen.

- [Github Repo](https://github.com/thecodizt/ClarityProjects/tree/master/delivery-tracking)
- [Github Gist](https://gist.github.com/thecodizt/a37bf6dac3e20ae9c254e9446f63334e)
- [Contract (Testnet)](https://explorer.stacks.co/txid/0xedb8c5d56dd4418be9e796ee03e90f54aedca5a0940fe1695e15a7edfa2bc644?chain=testnet)
- [Video Demo]()

## 🗻 Challenges Faced and Suggestions
I had few struggles using the Sequence types and I'd suggest adding a bit more examples around it to make it easier to understand. Sequences are crucial for building complex and powerful contracts and having more documetation, I believe would bring down the learning curve a lot, increasing the number of users thereby.

## 🎬 Conclusion
I was introduced to the Clarity language in this hackathon and I am confident that I'd choose Clarity over Solidity whenever there is a choice and I look forward to building dApps and not just contracts involving stacks and clarity in the near future. Thank you for your time and have a great day!

## 🔖 Relevant Details

- Author: [Devaraja G](https://github.com/thecodizt)
- License: MIT


