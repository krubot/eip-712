const { ethers } = require("hardhat");

async function main() {
  const [account] = await ethers.getSigners();

  // The domain config
  const domain = {
      name: 'Ether Mail',
      version: '1',
      chainId: 1,
      verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC'
  };

  // The named list of all type definitions
  const types = {
      Person: [
          { name: 'name', type: 'string' },
          { name: 'wallet', type: 'address' }
      ],
      Mail: [
          { name: 'from', type: 'Person' },
          { name: 'to', type: 'Person' },
          { name: 'contents', type: 'string' }
      ]
  };

  // The data to sign
  const value = {
      from: {
          name: 'Cow',
          wallet: account.address
      },
      to: {
          name: 'Bob',
          wallet: '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB'
      },
      contents: 'Hello, Bob!'
  };

  console.log("Deploying contracts with the account: ", account.address);

  console.log("Account balance: ", (await account.getBalance()).toString());

  const Example = await ethers.getContractFactory("Example");
  const example = await Example.deploy();

  await example.deployed();

  console.log("Contract has been deployed at: ",example.address);

  const sig = await account._signTypedData(domain, types, value);
  console.log("Typed data signature: ",sig);

  const sigSplit = ethers.utils.splitSignature(sig);
  console.log("Typed data split signature v: ",sigSplit.v);
  console.log("Typed data split signature r: ",sigSplit.r);
  console.log("Typed data split signature s: ",sigSplit.s);

  const sigAddress = ethers.utils.recoverAddress(ethers.utils._TypedDataEncoder.hash(domain, types, value),sig);
  console.log("Signature recovery address: ",sigAddress);

  const contractVerify = await example.verify(value,sigSplit.v,sigSplit.r,sigSplit.s);
  console.log("Contract verification check: ",contractVerify);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
