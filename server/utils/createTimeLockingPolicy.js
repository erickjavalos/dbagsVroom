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
    var hexAddr = "745fdd03338d480d578cddf40c166a31fadd6df03677d9ece40a1ad9"
    var slot = 99867162
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