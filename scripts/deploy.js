require("dotenv").config();

const { writeFileSync } = require("fs");
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

  if (process.env.GOERLI_EIP_712_CONTRACT == null) {
    var example = await Example.deploy();

    console.log("Transaction hash of the deployment: ", example.deployTransaction.hash);

    await example.deployed();

    console.log("Contract has been deployed at: ",example.address);

    writeFileSync('.env','GOERLI_EIP_712_CONTRACT=\'' + example.address + '\'\n',{flag:'a+'});
  } else {
    var example = Example.attach(process.env.GOERLI_EIP_712_CONTRACT);
    console.log("Contract has already been deployed at: ",process.env.GOERLI_EIP_712_CONTRACT);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
