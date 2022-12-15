require("dotenv").config();

task("check", "Runs a typedata check against the contract and returns the response", async () => {
    const [account] = await ethers.getSigners()

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

    const Example = await ethers.getContractFactory("Example");

    if (process.env.GOERLI_EIP_712_CONTRACT == null) {
      console.error("Contract has not been deployed, please deploy first using hardhat.");
      return
    }

    var example = Example.attach(process.env.GOERLI_EIP_712_CONTRACT);

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

})

module.exports = {}
