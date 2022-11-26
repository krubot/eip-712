# Hardhat implementation of eip-712

This repo deploys an implementation of the eip-712 standard for learning. It uses hardhat package to run deployments on ethereum goerli network. Please read up on the eip-712 standard [here](https://eips.ethereum.org/EIPS/eip-712) to get further information.

## Setup

To setup this repo firstly make sure you clone a local copy of this repo down to your workspace using git. Next download all the node modules needed here by running the following:

```
npm install
```

Now you'll need to setup the environment variable to be used in the deployment by creating a `.env` file with the following content:

```
GOERLI_RPC_URL='<goerli-rpc-url>'
PRIVATE_KEY='<private-key>'
```

You can use a rpc provider like `infura` and `Alchemy` for goerli and your private key can be grabbed from metamask. **Please make sure not to commit your .env file up, this can lead to loss of funds.**

## Compile and deploy

To compile this solidity code you'll need to run hardhat cli using `npx` like the following:

```
npx hardhat compile
```

Now you should be able to deploy your contract to goerli and run some verification transactions. To do this run the following:

```
npx hardhat run
```

Your output should look like the following:

```
(node:72440) ExperimentalWarning: stream/web is an experimental feature. This feature could change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
Deploying contracts with the account:  0xA7b192eBA8E0B07e2D25c632986fA4cB2666bB9f
Account balance:  317581165029412870
Contract has been deployed at:  0x08864eC0302B911BF0E9764f3C7EeC12bcC51597
Typed data signature:  0x31d49d9682b899057cedb3bcabd3f8a57e046f9e19d8dd67b99228dfda30227b1a5c8a36b4934e70e76da7b4eb47c4af3e3454d98a869eb2f8aa70663bf2db1e1c
Typed data split signature v:  28
Typed data split signature r:  0x31d49d9682b899057cedb3bcabd3f8a57e046f9e19d8dd67b99228dfda30227b
Typed data split signature s:  0x1a5c8a36b4934e70e76da7b4eb47c4af3e3454d98a869eb2f8aa70663bf2db1e
Signature recovery address:  0xA7b192eBA8E0B07e2D25c632986fA4cB2666bB9f
Contract verification check:  true
```
