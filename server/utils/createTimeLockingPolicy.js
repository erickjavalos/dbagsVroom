const NamiWalletApi = require('../nami-node-js/nami').NamiWalletApi
const fs = require('fs')
const dotenv = require('dotenv');
dotenv.config();


let blockfrostApiKey = {
    0: process.env.BLOCKFROST_PREPROD, // testnet
}

var nami =  new NamiWalletApi( blockfrostApiKey)  

const start = async () => {

    var hexAddr = "99aa9e80028ce41a3ae7199674b49e705a9cc826167f8406672b263e"
    var slot = 68281977
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