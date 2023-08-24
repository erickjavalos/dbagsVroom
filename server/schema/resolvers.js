const { Dbags, Autos } = require('../server/../models');
const { getAuthToken, getUserInfo, checkUserInGuild, signToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');
const { Profile } = require('../models');

// nami wallet 
var NamiWalletApi = require('../nami-node-js/nami').NamiWalletApi
const dotenv = require('dotenv');
const { lte } = require('semver');
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
    getDbagMetaData: async (parent, { assets }, context) => {
      if (context.user) {
        // find all dbag assets
        const dbagAssetsData = await Dbags.find({
          'onchain_metadata.name': { $in: assets },
        }).exec();

        return dbagAssetsData
      }
      throw new AuthenticationError('You need to be logged in!');

    },

    getAutoMetaData: async (parent, { assets }, context) => {
      if (context.user) {
        // find the autos given by the assets in the wallet
        const autoAssetsData = await Autos.find({
          asset_name: { $in: assets },
        }).exec();

        return autoAssetsData
      }
      throw new AuthenticationError('You need to be logged in!');
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

    login: async (parent, { code }) => {
      // extract token from mutation
      console.log(code)
      const Auth = await getAuthToken(code)
      // verify auth token was returned 
      if (!Auth?.error) {
        // Verify Discord presence
        const userInfo = await getUserInfo(Auth)
        if (userInfo) {
          // verify user is in discord user
          if (checkUserInGuild(userInfo.guilds)) {
            // extract data from api
            const discordId = userInfo.me.id
            const username = userInfo.me.username;
            const email = userInfo.me.email
            // search for profile based on discordID (unique)
            let profile = await Profile.findOne({ discordId });
            // add user to database and authenticate if they do not exist
            if (!profile) {
              // create profile
              profile = await Profile.create({ username, discordId, email });
            }
            // create jwt with profile from db
            const token = signToken(profile);
            // return jwt
            return {
              token: token
            }
          }
          else {
            throw new AuthenticationError('User not in guilds');
          }
        }
      }
      // token has already been used! or hacker using fake query parameter...
      else {
        // TODO: Reroute to /info page
        console.log(Auth)
        throw new AuthenticationError('Error in Authentication code provided!');
      }
    },

    // instantiate mint with dbag and auto selected
    // 1. Verify assets exist in wallet and asset has not been minted
    // 2. Generate image
    // 3. Upload image to ipfs
    // 4. get back ipfs hash and append to metadata
    // 5. hash the metadata and send it to the front end (optional, also return the regular metadata)
    mint: async (parent, { dbagInput, autoInput }, context) => {
      if (context.user) {


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
      }
      throw new AuthenticationError('You need to be logged in!');

    },

    submitMint: async (parent, { transaction, witnessSignature }, context) => {
      // verify user is signed in
      if (context.user) {
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
        console.log(`Asset minted: ${txHash}`)
        return txHash
      }
      throw new AuthenticationError('You need to be logged in!');

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


