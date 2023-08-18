const router = require('express').Router();

const { AutosMint } = require('../../models');
const { DbagsMint } = require('../../models');
var NamiWalletApi = require('../../nami-node-js/nami').NamiWalletApi

const dotenv = require('dotenv');
dotenv.config();

// instantiate blockfrost api
let blockfrostApiKey = {
    0: process.env.BLOCKFROST_PREPROD, // testnet
}

// instantiate nami class and set wallet private key for wallet to use
var nami = new NamiWalletApi(blockfrostApiKey)
nami.setPrivateKey(process.env.WALLET_PRIVATE_KEY)
/* 
{
   "721": {
     "<policyid>": {
        "nft0": {
          "id": 0,
          "name": "<nft-name>",
          "image": "<link-to-image>",
        },
        "nft1": {
          "id": 1,
          "name": "<nft-name>",
          "image": "<link-to-image>",
        },
     }
   }
}
*/
router.get('/startMintDbags', async (req, res) => {
    try {
        // get unminted from database
        const dbags = await DbagsMint.find({ minted: "FALSE" }).limit(10);
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
                "91d319c0fc8c557244d2ac5c2d1c0cbeaeb40a13804f122a51705da1": // policyId
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
        let witnessMinting = await nami.signTxCBOR(transaction, "e077a6a58c4ee9d49aecd7186f38a4a0b47cadee90ac1ad45dcffd5cf60951cc")
        // generate witnesses array
        let witnesses = [witnessSignature, witnessMinting]
        
        // submit transaction to blockchain
        let txHash = await nami.submitTx({
          transactionRaw: transaction,
          witnesses: witnesses,
          networkId: 0,
          metadata: JSON.parse(metadata)
        })
        res.status(200).json(txHash)

    }
})

module.exports = router;
