const router = require('express').Router();
const fs = require('fs')
var NamiWalletApi = require('../../nami-node-js/nami').NamiWalletApi
const dotenv = require('dotenv');
dotenv.config();

// instantiate blockfrost api
let blockfrostApiKey = {
                        0: process.env.BLOCKFROST_PREPROD, // testnet
                        }
// instantiate nami class and set wallet private key for wallet to use
var nami =  new NamiWalletApi( blockfrostApiKey )      
nami.setPrivateKey(process.env.WALLET_PRIVATE_KEY)

// /api/mint
// instantiate mint process from server
router.get('/', async (req, res) => {
  console.log('backend is hit!!!!!!!!!!!!!!*****')
  // read in policy script that was generated
  var policyScript = JSON.parse(fs.readFileSync("./policyScripts/policy.json", "utf8"))

  // figure out how to dynamically append keys to an object from policyScript data
  const metadata = 
  {
    "721":
    {
      "e68bb3aa673e54c0e7873a7f00d575bd5af1b544600a4b59d8193cf8": // policyId
      {
        "MyNFT": // NFTName
          {
            "name": "MyNFT",
            "description":"This is a test NFT",
            "image":"ipfs://QmUb8fW7qm1zCLhiKLcFH9yTCZ3hpsuKdkTgKmC8iFhxV8"
          }
        }
    }
  }

  // hash the metadata 
  const metaDataHash = nami.hashMetadata(metadata)

  // return metadataHash
  res.status(200).json({
    'metaDataHash': metaDataHash
  });
});

module.exports = router;
