# Simple Transaction - Clarity Contract

This contract enables the real-time tracking of a delivery where the sender, middlemen and reciever are all Principals and the sender alone can set the receiver address and the receiver can track who currently owns the package. Once the delivery is complete no more transfer of package can happen.

- [Github Repo](https://github.com/thecodizt/ClarityProjects/tree/master/delivery-tracking)
- [Github Gist](https://gist.github.com/thecodizt/a37bf6dac3e20ae9c254e9446f63334e)
- [Contract (Testnet)](https://explorer.stacks.co/txid/0xedb8c5d56dd4418be9e796ee03e90f54aedca5a0940fe1695e15a7edfa2bc644?chain=testnet)
- [Video Demo](https://youtu.be/EZv4i2XvgAg)

## Error Codes

| Error Code | Meaning |
| ---------- | ------- |
| 100 | Package receiver not set yet |
| 101 | Package receiver already set |
| 102 | Package already delivered |
| 103 | Can transfer only to warehouse |
| 104 | Not the current holder of the package |
| 105 | Can transfer only to receiver |
| 106 | Not the sender |

## Documentation

### get-receiver

#### Input
None

#### Output
Receiver address (principal)

#### Description
This function retrieves the receiver's address

### get-current-holder

#### Input
None

#### Output
Holder address (principal)

#### Description
This function retrieves the holders address

### set-receiver

#### Input
- person: (principal) Receiver address
- address: (string-utf8) Phsyical address of the receiver
- pin: (uint) Pin number for the location

#### Output
Bool

#### Description
This function sets the receivers data

### move-to-warehouse

#### Input
- id: (principal) Warehouse ID

#### Output
Bool

#### Description
This function transfers the package to the specified warehouse id

### deliver

#### Input
None

#### Output
Bool

#### Description
This function transfers the package to the final receiver


## Try it out

To try it out on your machine locally, follow the given commands. Make sure that clarinet is already installed.

```console
git clone https://github.com/thecodizt/ClarityProjects.git
cd ClarityProjects/delivery-tracking
clarinet check
clarinet test
clarinet console
```

You are now ready to interact with the local implementation of the contract. Have fun!