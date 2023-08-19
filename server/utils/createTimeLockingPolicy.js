const NamiWalletApi = require('../nami-node-js/nami').NamiWalletApi
const fs = require('fs')
const dotenv = require('dotenv');
dotenv.config();


let blockfrostApiKey = {
    0: process.env.BLOCKFROST_PREPROD, // testnet
}

var nami =  new NamiWalletApi( blockfrostApiKey)  

const start = async () => {

    var hexAddr = "f470e462b6dc09191242076fb2cb25d62e825101c42d8f89931d8d0f"
    var slot = 99867116
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