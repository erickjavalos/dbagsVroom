const dotenv = require('dotenv');
dotenv.config();

var NamiWalletApi = require('../nami-node-js/nami').NamiWalletApi
let blockfrostApiKey = {
                        0: process.env.BLOCKFROST_PREPROD, // testnet
                        }
//React example
var nami =  new NamiWalletApi( blockfrostApiKey )             
let privateKey = nami.createNewBech32PrivateKey()


console.log(privateKey)