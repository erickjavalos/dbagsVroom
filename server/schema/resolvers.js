const { AuthenticationError } = require('apollo-server-express');
const { GraphQLError } = require('graphql')
const { Dbags, Autos, Mint, Wallets } = require('../server/../models');
const { DBAGS_POLICY, WHIPS_POLICY } = require('../Constants.js');
const ExtractAssets = require('../utils/ExtractAssets');
const { Profile } = require('../models');
const { getAuthToken, getUserInfo, checkUserInGuild, signToken } = require('../utils/auth');
const { checkMint, getMetadata, updateMetadata, uploadIPFS, changeState, txHashExists, assetsExists } = require('../utils/mint');
const ConstructMfer = require('../utils/ConstructMfer');

const fetch = require('node-fetch');

const paymentWallet = "addr_test1qqyretpvwl6hy9jtcj3l8fru66k2r2ff25tnf4zktyxu0flmk9yfxfh2c4pfes04jwnw9p7htz36erfa6aym4jtpvc8qzvtklj"
const mintCost = 10;


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
          'onchain_metadata.name': { $in: assets },
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
        console.log(Auth);
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

    // upon an address being received, this will poll the blockchain and extract all assets in 
    // dbags and autos policy
    getAssetsInWallet: async (parent, { address }, context) => {
      // ensure user is logged into application
      if (context.user) {
        if (address) {
          // instantiante helper class to extract assets
          const extractAssets = new ExtractAssets(address, DBAGS_POLICY, WHIPS_POLICY, Wallets);
          // extract assets
          const assets = await extractAssets.getAssets()

          return assets
        }
      }
    },

    // instantiate mint with dbag and auto selected
    // 1. Verify asset hasnt been minted
    // 2. Generate image
    // 3. Upload image to ipfs
    // 4. get back ipfs hash and append to metadata
    // 5. hash the metadata and send it to the front end (optional, also return the regular metadata)
    mint: async (parent, { dbagInput, autoInput, address }, context) => {


      // initialize helper class to construct image
      const constructMfer = new ConstructMfer()
      // TODO:::::: add context.user logic and updating of database when endpoint is hit to log addresses of users 
      if (context.user) {
        // update address of user that authenticated with discord 
        const profile = await Profile.findOneAndUpdate(
          { discordId: context.user.discordId },
          { $addToSet: { addresses: address } },
          { new: true }
        )
        let assetMinted = await checkMint(Mint, autoInput);
        if (assetMinted) {
          // 2. Generate image
          const img = await constructMfer.generateImage(dbagInput, autoInput)
          // img.writeAsync(`./imgs/test.png`)
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
                [`${process.env.POLICY_ID}`]: // policyId
                {
                  [`dbagxauto${assetNumber}`]: // dynamic get from db
                  {
                    "Name": `DbagxAuto${assetNumber}`, // dynamic
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
      }
      throw new AuthenticationError('You need to be logged in!');

    },


    submitMint: async (parent, { transaction, witnessSignature, autoInput }, context) => {
      // verify user is signed in
      if (context.user) {
        console.log('submitting mint...')
        // verify no txHash in database
        let hashExists = await txHashExists(Mint, autoInput)
        // continue mint if hash doesnt exist, means it wasnt already minted
        if (!hashExists) {

          let [inputs, outputs, metadataTransaction, fee] = await nami.decodeTransaction(
            transaction,
            0
          )
          // extract payment from outputs 
          const paymentOutput = outputs?.find(
            (output) => output.address === paymentWallet
          )
          // extract asset destination
          const assetNumber = autoInput.onchain_metadata.name.split("Dbag Mfers Auto Club ")[1]
          const assetDestination = outputs?.find(
            (output) => output?.assets[`${process.env.POLICY_ID}.dbagxauto${assetNumber}`]
          )
          // verify payment address is valid
          if (!paymentOutput) {
            console.log(`payment address is invalid ${autoInput.onchain_metadata.name}`)
            throw new GraphQLError('payment address is invalid'), {
              extensions: {
                code: 'ERROR'
              }
            }
          }

          // check if only one input exists
          if (inputs.length !== 1) {
            console.log('more than one input inputted')
            throw new GraphQLError('issue with inputs!'), {
              extensions: {
                code: 'ERROR'
              }
            }
          }
          // check if only one output exists, should be one input, one output
          if (outputs.length !== 2) {
            console.log('two outputs should exists')
            // console.log(output)
            throw new GraphQLError('issue with outputs!'), {
              extensions: {
                code: 'ERROR'
              }
            }
          }
          // input is only one and unique
          const minter = inputs[0]

          // verify the input address(person who signed) matches the asset destination address (person recieves assets)
          if (minter.address !== assetDestination.address) {
            console.log('asset is not being sent to the person who signed!')
            throw new GraphQLError('cost is invalid'), {
              extensions: {
                code: 'ERROR'
              }
            }
          }

          // verify payment amount is valid
          const ada = paymentOutput?.amount / 1000000 // convert lovelace to ada
          const rounded = Math.round(ada * 1000) / 1000 // round to 3 decimals
          const amountValid = rounded === mintCost
          // verify amount is valid
          if (!amountValid) {
            console.log('payment amount is invalid')
            throw new GraphQLError('cost is invalid'), {
              extensions: {
                code: 'ERROR'
              }
            }
          }

          // extract metadata from backend database
          const metadata = await getMetadata(Mint, autoInput)
          // verify metadata was returned
          if (!metadata) {
            console.log(`ERROR: No metadata found for`)
            console.log('***************************')
            console.log(autoInput)
            console.log('***************************')
            throw new GraphQLError('No metadata found for asset'), {
              extensions: {
                code: 'ERROR'
              }
            }

          }


          // verify assets exist in wallet
          const assetsExist = await assetsExists(minter.address, metadata, autoInput, Wallets)
          // error out!
          if (!assetsExist) {
            console.log("ERROR with assets not existing in input address field")
            throw new GraphQLError('Assets do not exist in wallet!'), {
              extensions: {
                code: 'ERROR'
              }
            }

          }

          // signing cbor comes from cborHex of signing key from policy. removes the 5820 from the string
          let witnessMinting = await nami.signTxCBOR(transaction, process.env.POLICY_SIGNING_CBOR)
          let witnesses = [witnessSignature, witnessMinting]

          // submit transaction to blockchain
          let txHash = await nami.submitTx({
            transactionRaw: transaction,
            witnesses: witnesses,
            networkId: 0,
            metadata: JSON.parse(metadata)
          })
          // console.log(txHash)
          if (txHash?.error) {
            console.log(`Tx Error: ${txHash.error}`)
            console.log(txHash)
            console.log("metadata: ")
            const json = JSON.stringify(JSON.parse(metadata))

            console.log(json)
            console.log('transaction')
            console.log(transaction)

            throw new GraphQLError('Issue with tx error'), {
              extensions: {
                code: 'ERROR'
              }
            }
          }

          console.log(`Asset minted: ${txHash}`)
          // change state
          const stateChanged = await changeState(Mint, autoInput, "MINTED", txHash)

          // delay for utxos to catchup
          console.log("waiting....")
          await new Promise(r => setTimeout(r, 10000));
          console.log("done...")
          

          // return txHash
          return stateChanged ? txHash : () => {
            console.log("state didnt change")
            throw new GraphQLError('issue with txHash', {
              extensions: {
                code: 'ERROR'
              }
            })
          }
        }
        // asset has already been minted
        else {
          throw new GraphQLError('asset has been minted'), {
            extensions: {
              code: 'ERROR'
            }
          }
        }
      }
      throw new AuthenticationError('You need to be logged in!');

    },

    getAvailableWhips: async (parent, { assets }, context) => {
      if (context.user) {
        // extract asset onchain_metadata.name
        const assetNames = assets.map((asset) => asset.onchain_metadata.name)
        // query database
        try {
          const assetsAvailable = await Mint.find({
            name: { $in: assetNames },
            txHash: { $exists: false, $eq: null }
          });

          // extract only names and return that
          
          const assetsAvailableStr = assetsAvailable.map((asset)=> asset.name)
          // resolve the array of available assets
          return assetsAvailableStr

        } catch (err) {
          console.error("Error querying the database:", err);
          throw new AuthenticationError('Issue querying database');
          
        }

      }
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

