const NamiWalletApi = require('../nami-node-js/nami').NamiWalletApi
const fs = require('fs')
const dotenv = require('dotenv');
dotenv.config();


let blockfrostApiKey = {
    0: process.env.BLOCKFROST_PREPROD, // testnet
}

var nami =  new NamiWalletApi( blockfrostApiKey)  

const start = async () => {

    var hexAddr = "98d6a076c31a9d248ec8fe5459682f2ec2623cf376ad0c1c5a61237b"
    var slot = 47519995
    let policy = await nami.createLockingPolicyScriptHexKey(hexAddr, slot)

    console.log(policy)

    console.log("Writing Policy script to file")

    var jsonData = JSON.stringify(policy)

    fs.writeFile('policy.json', jsonData, (err) => {
        if (err)
            console.log(err);
        else {
            console.log("File written successfully\n");
        }
    });
}

start()