const { async } = require('regenerator-runtime');
const { Dbags, Autos } = require('../server/../models');

// nami wallet 
var NamiWalletApi = require('../nami-node-js/nami').NamiWalletApi
const dotenv = require('dotenv');
dotenv.config();

// instantiate blockfrost api
let blockfrostApiKey = {
  0: process.env.BLOCKFROST_PREPROD, // testnet
}

// instantiate nami class and set wallet private key for wallet to use
var nami = new NamiWalletApi(blockfrostApiKey)
nami.setPrivateKey(process.env.WALLET_PRIVATE_KEY)

const resolvers = {
  Query: {
    getSelectedMetaData: async (parent, { dbagAssets, autoAssets }) => {
      const dbagAssetsData = await Dbags.find({
        'onchain_metadata.name': { $in: dbagAssets },
      }).exec();

      const autoAssetsData = await Autos.find({
        asset_name: { $in: autoAssets },
      }).exec();

      return {
        dbagAssets: dbagAssetsData,
        autoAssets: autoAssetsData,
      };
    },
    getDbagMetaData: async (parent, { assets }) => {
      const dbagAssetsData = await Dbags.find({
        'onchain_metadata.name': { $in: assets },
      }).exec();
      console.log(assets)

      return dbagAssetsData
    },

    getAutoMetaData: async (parent, { assets }) => {
      console.log(assets)
      const autoAssetsData = await Autos.find({
        asset_name: { $in: assets },
      }).exec();

      console.log(autoAssetsData)
      return autoAssetsData
    },

    getAsset: async (parent, { id }) => {
      const asset = await Dbags.findById(id).exec();
      return asset;
    },
    getAllAutoAssets: async () => {
      const assets = await Autos.find().exec();
      return assets;
    },

    getAllDbagAssets: async () => {
      const assets = await Dbags.find().exec();
      return assets;
    },
  },
  Mutation: {
    createAsset: async (parent, { assetInput }) => {
      // Extract the assetInput values
      const {
        asset,
        policy_id,
        asset_name,
        fingerprint,
        quantity,
        initial_mint_tx_hash,
        mint_or_burn_count,
        onchain_metadata,
        onchain_metadata_standard,
      } = assetInput;

      // Create a new Dbags document
      const newAsset = new Dbags({
        asset,
        policy_id,
        asset_name,
        fingerprint,
        quantity,
        initial_mint_tx_hash,
        mint_or_burn_count,
        onchain_metadata,
        onchain_metadata_standard,
      });

      // Save the new asset to the database
      const createdAsset = await newAsset.save();

      return createdAsset;
    },

    // instantiate mint with dbag and auto selected
    // 1. Verify assets exist in wallet and asset has not been minted
    // 2. Generate image
    // 3. Upload image to ipfs
    // 4. get back ipfs hash and append to metadata
    // 5. hash the metadata and send it to the front end (optional, also return the regular metadata)
    mint: async (parent, { dbagInput, autoInput }) => {

      // (TODO) 1. Verify mint with dbag and auto selected
      let assetsExist = true
      if (assetsExist) {

        // 2. Generate image
      }

      const metadata =
      {
        "721":
        {
          "e68bb3aa673e54c0e7873a7f00d575bd5af1b544600a4b59d8193cf8": // policyId
          {
            "MyNFT": // NFTName
            {
              "name": "MyNFT",
              "description": "This is a test NFT",
              "image": "ipfs://QmUb8fW7qm1zCLhiKLcFH9yTCZ3hpsuKdkTgKmC8iFhxV8"
            }
          }
        }
      }

      // hash the metadata for user to sign
      const metaDataHash = nami.hashMetadata(metadata)
      // 
      return {
        hashedMeta: metaDataHash,
        metadata: JSON.stringify(metadata)
      }

    },

    submitMint: async (parent, { transaction, witnessSignature }) => {
      // sign transaction (MUST CHECK IF INPUTS AND OUTPUTS ARE CORRECT)
      let witnessMinting = await nami.signTxCBOR(transaction, "e077a6a58c4ee9d49aecd7186f38a4a0b47cadee90ac1ad45dcffd5cf60951cc")
      // combine witnesses/signatures
      let witnesses = [witnessSignature, witnessMinting]

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
              "description": "This is a test NFT",
              "image": "ipfs://QmUb8fW7qm1zCLhiKLcFH9yTCZ3hpsuKdkTgKmC8iFhxV8"
            }
          }
        }
      }
      // submit transaction to blockchain
      let txHash = await nami.submitTx({
        transactionRaw: transaction,
        witnesses: witnesses,
        networkId: 0,
        metadata: metadata
      })
      console.log(txHash)
      return txHash
    },


    updateAsset: async (parent, { id, assetInput }) => {
      // Update the existing asset in the database
      const updatedAsset = await Dbags.findByIdAndUpdate(id, assetInput, {
        new: true,
      }).exec();

      return updatedAsset;
    },
    deleteAsset: async (parent, { id }) => {
      // Delete the asset from the database
      const deletedAsset = await Dbags.findByIdAndDelete(id).exec();

      return deletedAsset;
    },
  },
};

module.exports = resolvers;


