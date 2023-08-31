const router = require('express').Router();
const { Dbags, Autos } = require('../../models');


// instantiate mint process from server
router.post('/getSelectedMetaData', async (req, res) => {

    const dbagAssets = await Dbags.find()
        .where('onchain_metadata.name')
        .in(req.body.dbagAssets)
        .select()
        .exec();    
    // console.log(await Autos.find())
    const autoAssets = await Autos.find()
        .where('asset_name')
        .in(req.body.autoAssets)
        .select()
        .exec(); 
                
    // return metadataHash
    res.status(200).json({
        'dbagAssets': dbagAssets,
        'autoAssets': autoAssets 
    });
});

router.get('/getMetaData', async (req, res) => {
    const dbagAssets = await Dbags.find()
    // console.log(dbagAssets)
    const autoAssets = await Autos.find()
    // console.log(autoAssets) 
        
    // return metadataHash
    res.status(200).json({
        'dbagAssets': dbagAssets,
        'autoAssets': autoAssets 
    });
});




// router.post('/processMint', async (req, res) => {
  
//   const {witnessBuyer, transaction} = req.body

//   // sign transaction (MUST CHECK IF INPUTS AND OUTPUTS ARE CORRECT)
//   let witnessMinting = await nami.signTxCBOR(transaction,"e077a6a58c4ee9d49aecd7186f38a4a0b47cadee90ac1ad45dcffd5cf60951cc")
//   // combine witnesses/signatures
//   let witnesses = [witnessBuyer, witnessMinting]
  
//   // reinitialize metadata (FIX LATER)
//   const metadata = 
//   {
//     "721":
//     {
//       "e68bb3aa673e54c0e7873a7f00d575bd5af1b544600a4b59d8193cf8": // policyId
//       {
//         "MyNFT": // NFTName
//           {
//             "name": "MyNFT",
//             "description":"This is a test NFT",
//             "image":"ipfs://QmUb8fW7qm1zCLhiKLcFH9yTCZ3hpsuKdkTgKmC8iFhxV8"
//           }
//         }
//     }
//   }
//   // submit transaction to blockchain
//   let txHash = await nami.submitTx({
//       transactionRaw: transaction,
//       witnesses: witnesses, 
//       networkId : 0, 
//       metadata: metadata
//   }) 
//   console.log("txHash")
//   console.log(txHash)

// })

module.exports = router;
