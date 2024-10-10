const NamiWalletApi = require('../nami-node-js/nami').NamiWalletApi
const fs = require('fs')
const dotenv = require('dotenv');
dotenv.config();


let blockfrostApiKey = {
    0: process.env.BLOCKFROST_PREPROD, // testnet
}

var nami =  new NamiWalletApi( blockfrostApiKey)  

const start = async () => {

    // comes from policy.script keyHash
    var hexAddr = "624d55c0e5d2a1712436b3bb188be1703e33b478dc2da3a31985f7d4"
    var slot = 85276840
    let policy = await nami.createLockingPolicyScriptHexKey(hexAddr, slot)

    console.log(policy)

    console.log("Writing Policy script to file")

    var jsonData = JSON.stringify(policy)

    // fs.writeFile('policy.json', jsonData, (err) => {
    //     if (err)
    //         console.log(err);
    //     else {
    //         console.log("File written successfully\n");
    //     }
    // });
}

start()