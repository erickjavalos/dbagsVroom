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

  // metadata to mint (truth)
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

  // hash the metadata for user to sign
  const metaDataHash = nami.hashMetadata(metadata)

  // return metadataHash
  res.status(200).json({
    'metaDataHash': metaDataHash
  });
});

router.post('/processMint', async (req, res) => {
  
  const {witnessBuyer, transaction} = req.body

  // sign transaction (MUST CHECK IF INPUTS AND OUTPUTS ARE CORRECT)
  let witnessMinting = await nami.signTxCBOR(transaction,"e077a6a58c4ee9d49aecd7186f38a4a0b47cadee90ac1ad45dcffd5cf60951cc")
  // combine witnesses/signatures
  let witnesses = [witnessBuyer, witnessMinting]
  
  // reinitialize metadata (FIX LATER)
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
  // submit transaction to blockchain
  let txHash = await nami.submitTx({
      transactionRaw: transaction,
      witnesses: witnesses, 
      networkId : 0, 
      metadata: metadata
  }) 
  console.log("txHash")
  console.log(txHash)

})

module.exports = router;
