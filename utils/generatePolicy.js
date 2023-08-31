const dotenv = require('dotenv');
dotenv.config();

const NamiWalletApi = require('../nami-node-js/nami').NamiWalletApi
const fs = require('fs')

const networkId = 0 // preprod network
// blockfrost ids
let blockfrostApiKey = {
    0: process.env.BLOCKFROST_PREPROD, // testnet
}

var nami =  new NamiWalletApi( blockfrostApiKey)  


console.log("Setting Private Key...\n")
nami.setPrivateKey(process.env.WALLET_PRIVATE_KEY)


// set policy lock
const expirationTime = new Date();
expirationTime.setTime(expirationTime.getTime() + (24 * 60 * 60 * 1000))  // 24hrs in milliseconds

const generatePolicy = async () => {

    // generate policy 
    let policy = await nami.createLockingPolicyScript(networkId, expirationTime)

    console.log("Writing Policy script to file")

    var jsonData = JSON.stringify(policy)

    fs.writeFile( './policyScripts/policy.json', jsonData, (err) => {
        if (err)
        console.log(err);
        else {
        console.log("File written successfully\n");
        }
    });

}

generatePolicy()