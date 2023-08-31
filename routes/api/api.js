const router = require('express').Router();

const { AutosMint } = require('../../models');
const { DbagsMint } = require('../../models');
var NamiWalletApi = require('../../nami-node-js/nami').NamiWalletApi

const dotenv = require('dotenv');
dotenv.config();

const dbagsPolicyID = "ecb41dc4214459af7e74b40116704b5aed34d4deda785e59a7cf8c53"
const whipsPolicyID = "a89d6c96713c57190c98cae3d26a85e1528bc9ec22fb85d5e21e0ab7"

// instantiate blockfrost api
let blockfrostApiKey = {
    0: process.env.BLOCKFROST_PREPROD, // testnet
}

// instantiate nami class and set wallet private key for wallet to use
var nami = new NamiWalletApi(blockfrostApiKey)
nami.setPrivateKey(process.env.WALLET_PRIVATE_KEY)

router.get('/startMintDbags', async (req, res) => {
    try {
        // get unminted from database
        const dbags = await DbagsMint.find({ minted: "FALSE" }).limit(10);
        console.log('found dbags')
        console.log(dbags)
        // iterate through each dbag and construct metadata
        // console.log(dbags)
        const assets = {}
        dbags.forEach((dbag) => {
            assets[`${dbag.onchain_metadata.name}`] = dbag.onchain_metadata
        })
        // create metadata with multiple assets and hash that
        const metadata =
        {
            "721":
            {
                [`${dbagsPolicyID}`]: // policyId
                    assets
            }
        }

        // hash metadata
        const metaDataHash = nami.hashMetadata(metadata)

        res.status(200).json(
            {
                metaDataHash: metaDataHash,
                metadata: metadata
            }
        )
    }
    catch (error) {
        console.log(error)
        res.status(400).json({ "error": "cant process amount " })
    }

})

// whips mint
router.get('/startMintWhips', async (req, res) => {
    try {
        // get unminted from database
        const whips = await AutosMint.find({ minted: "FALSE" }).limit(10);
        // iterate through each dbag and construct metadata
        const assets = {}
        whips.forEach((whip) => {
            assets[`${whip.onchain_metadata.name}`] = whip.onchain_metadata
        })
        // create metadata with multiple assets and hash that
        const metadata =
        {
            "721":
            {
                [`${whipsPolicyID}`]: // policyId
                    assets
            }
        }

        // hash metadata
        const metaDataHash = nami.hashMetadata(metadata)

        res.status(200).json(
            {
                metaDataHash: metaDataHash,
                metadata: metadata
            }
        )
    }
    catch (error) {
        console.log(error)
        res.status(400).json({ "error": "cant process amount " })
    }

})


router.post('/submitMintDbags', async (req, res) => {
    // console.log(req.body)
    const transaction = req.body?.transaction || null
    const witnessSignature = req.body?.witnessBuyer || null
    const metadata = req.body?.metadata || null
    if (
        transaction &&
        witnessSignature &&
        metadata
    ) 
    {
        // sign transaction
        let witnessMinting = await nami.signTxCBOR(transaction, "1b6f6d0e540f600bf5c4f0f1e426b0353d62dbed6839a57784ffede59d244456")
        // generate witnesses array
        let witnesses = [witnessSignature, witnessMinting]
        
        // submit transaction to blockchain
        let txHash = await nami.submitTx({
          transactionRaw: transaction,
          witnesses: witnesses,
          networkId: 0,
          metadata: JSON.parse(metadata)
        })
        
        // update state in the database
        const formattedMeta = JSON.parse(metadata)
        const assets = formattedMeta['721'][`${dbagsPolicyID}`]
        console.log("minting processing")
        console.log(assets)

        const names = Object.keys(assets)

        // Define the query to search for documents with a name value in the specified array
        const query = { "onchain_metadata.name": { $in: names } };

        // Define the update operation to add the minted field with value "true"
        const update = { $set: { "minted": "true" } };

        // Define the options for the update operation
        const options = { multi: true };

        // Execute the update operation
        const result = await DbagsMint.updateMany(query, update, options);
        console.log(result)
        
        res.status(200).json(txHash)

    }
})

// submit whips to chain
router.post('/submitMintWhips', async (req, res) => {
    // console.log(req.body)
    const transaction = req.body?.transaction || null
    const witnessSignature = req.body?.witnessBuyer || null
    const metadata = req.body?.metadata || null
    if (
        transaction &&
        witnessSignature &&
        metadata
    ) 
    {
        // sign transaction
        let witnessMinting = await nami.signTxCBOR(transaction, "fca21479d3b04f840ca31cf34149c685f23ce2fca800a85ab37bbe2f0cd9953c")
        // generate witnesses array
        let witnesses = [witnessSignature, witnessMinting]
        
        // submit transaction to blockchain
        let txHash = await nami.submitTx({
          transactionRaw: transaction,
          witnesses: witnesses,
          networkId: 0,
          metadata: JSON.parse(metadata)
        })
        
        // update state in the database
        const formattedMeta = JSON.parse(metadata)
        const assets = formattedMeta['721'][`${whipsPolicyID}`]
        console.log("minting processing")
        console.log(assets)

        const names = Object.keys(assets)

        // Define the query to search for documents with a name value in the specified array
        const query = { "onchain_metadata.name": { $in: names } };

        // Define the update operation to add the minted field with value "true"
        const update = { $set: { "minted": "true" } };

        // Define the options for the update operation
        const options = { multi: true };

        // Execute the update operation
        const result = await AutosMint.updateMany(query, update, options);
        console.log(result)
        
        res.status(200).json(txHash)

    }
})

module.exports = router;
