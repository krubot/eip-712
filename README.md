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

Now you should be able to deploy your contract to goerli. To do this run the following:

```
npx hardhat run scripts/deploy.js
```

Your output should look like the following:

```
(node:1024785) ExperimentalWarning: stream/web is an experimental feature. This feature could change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
Deploying contracts with the account:  0xA7b192eBA8E0B07e2D25c632986fA4cB2666bB9f
Account balance:  305587835267561840
Transaction hash of the deployment:  0x80e3ce93356c5d58106949fe7eb8e8f5594bc33a0ac4ca6210f51ae91ba206f1
Contract has been deployed at:  0x0BD00f03C59153F32C20746410cBB4c315F1767E
```

## Verification check

To verify the typedata deployment you can run the check command as follows:

```
npx hardhat check
```

Your output should then look like the following:

```
(node:1018298) ExperimentalWarning: stream/web is an experimental feature. This feature could change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
Typed data signature:  0x31d49d9682b899057cedb3bcabd3f8a57e046f9e19d8dd67b99228dfda30227b1a5c8a36b4934e70e76da7b4eb47c4af3e3454d98a869eb2f8aa70663bf2db1e1c
Typed data split signature v:  28
Typed data split signature r:  0x31d49d9682b899057cedb3bcabd3f8a57e046f9e19d8dd67b99228dfda30227b
Typed data split signature s:  0x1a5c8a36b4934e70e76da7b4eb47c4af3e3454d98a869eb2f8aa70663bf2db1e
Signature recovery address:  0xA7b192eBA8E0B07e2D25c632986fA4cB2666bB9f
Contract verification check:  true
```
