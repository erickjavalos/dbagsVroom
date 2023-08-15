const { AuthenticationError } = require('apollo-server-express');
const { GraphQLError } = require('graphql')
const { Dbags, Autos, Mint } = require('../server/../models');
const { Profile } = require('../models');
const { getAuthToken, getUserInfo, checkUserInGuild, signToken } = require('../utils/auth');
const { checkMint, getMetadata, updateMetadata, uploadIPFS } = require('../utils/mint');
const ConstructMfer = require('../utils/ConstructMfer');
const fetch = require('node-fetch');

const paymentWallet = "addr_test1qrnns8ctrctt5ga9g990nc4d7pt0k25gaj0mnlda320ejmprlzyh4mr2psnrgh6ht6kaw860j5rhv44x4mt4csl987zslcr4p6"


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
    // 1. Verify asset hasnt been minted
    // 2. Generate image
    // 3. Upload image to ipfs
    // 4. get back ipfs hash and append to metadata
    // 5. hash the metadata and send it to the front end (optional, also return the regular metadata)
    mint: async (parent, { dbagInput, autoInput }, context) => {


      // initialize helper class to construct image
      const constructMfer = new ConstructMfer()
      // TODO:::::: add context.user logic and updating of database when endpoint is hit to log addresses of users 
      // if (context.user) {
      // (TODO) 1. Verify mint with dbag and auto selected
      // update address of user that authenticated with discord 
      // const profile = await Profile.findOneAndUpdate(
      //   { discordId: context.user.discordId },
      //   { $addToSet: { addresses: address } },
      //   { new: true }
      // )

      let assetMinted = await checkMint(Mint, autoInput);
      if (assetMinted) {
        // 2. Generate image
        const img = await constructMfer.generateImage(dbagInput, autoInput)
        // 3. Upload image to ipfs and retrieve data
        const ipfsHash = await uploadIPFS(img, dbagInput, autoInput)
        // verify ipfs hash was returned
        if (ipfsHash) {
          const assetNumber = autoInput.onchain_metadata.name.split("Dbag Mfers Auto Club ")[1]
          // 4. construct metadata
          const metadata =
          {
            "721":
            {
              "91d319c0fc8c557244d2ac5c2d1c0cbeaeb40a13804f122a51705da1": // policyId
              {
                [`dbagxauto${assetNumber}`]: // dynamic get from db
                {
                  "Name": `dbagxauto${assetNumber}`, // dynamic
                  "Dbag": `${dbagInput.onchain_metadata.name}`,
                  "Auto": `${autoInput.onchain_metadata.name}`,
                  "image": `ipfs://${ipfsHash}`,
                  "Collection": "Mfers Auto Club: Customizable NFTs",
                  "Twitter": "https://twitter.com/dbagmfers",
                  "Website": "https://www.dbagmfers.fun/"
                }
              }
            }
          }
          // hash the metadata for user to sign
          const metaDataHash = nami.hashMetadata(metadata)
          // update metadata
          const updatedMetadata = await updateMetadata(Mint, autoInput, metadata)
          // ensure that metadata was updated in the database
          if (updatedMetadata) {
            return {
              hashedMeta: metaDataHash,
              assetName: `dbagxauto${assetNumber}`
            }
          }
          // give error that the metadata wasnt saved in the database for this car asset
          else {
            throw new GraphQLError('Failed to save metadata in database'), {
              extensions: {
                code: 'FORBIDDEN'
              }
            }
          }

        }
        // didnt upload image to ipfs, dont proceed with mint
        else {
          throw new GraphQLError('Failed to upload to ipfs'), {
            extensions: {
              code: 'FORBIDDEN'
            }
          }
        }

      }
      else {
        throw new GraphQLError('Asset has already been minted', {
          extensions: {
            code: 'FORBIDDEN',
          },
        });
      }
      // }
      // throw new AuthenticationError('You need to be logged in!');

    },


    submitMint: async (parent, { transaction, witnessSignature, autoInput }, context) => {
      console.log("submit mint")
      console.log(autoInput)
      // verify user is signed in
      // if (context.user) {
        // verify transaction is legit
        // console.log("submit mint")
        // let [inputs, outputs, metadataTransaction, fee] = await nami.decodeTransaction(
        //   transaction,
        //   0
        // )
        // // extract payment from outputs 
        // const paymentOutput = outputs?.find(
        //   (output) => output.address === paymentWallet
        // )

        // if (!paymentOutput) {
        //   throw new GraphQLError('payment address is not defined'), {
        //     extensions: {
        //       code: 'ERROR'
        //     }
        //   }
        // }

        // extract metadata from backend database
        const metadata = await getMetadata(Mint, autoInput)
        console.log(metadata)

        let witnessMinting = await nami.signTxCBOR(transaction, "e077a6a58c4ee9d49aecd7186f38a4a0b47cadee90ac1ad45dcffd5cf60951cc")
        // combine witnesses/signatures
        let witnesses = [witnessSignature, witnessMinting]

        // submit transaction to blockchain
        let txHash = await nami.submitTx({
          transactionRaw: transaction,
          witnesses: witnesses,
          networkId: 0,
          metadata: JSON.parse(metadata)
        })
        // console.log(txHash)
        console.log(`Asset minted: ${txHash}`)
        // change state
        // const stateChanged = await changeState(Mint)
        return txHash
      // }
      // throw new AuthenticationError('You need to be logged in!');

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

