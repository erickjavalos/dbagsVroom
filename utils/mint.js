require('dotenv').config()
const { Readable } = require("stream");
const FormData = require("form-data");
const axios = require("axios");

const { DBAGS_POLICY, WHIPS_POLICY } = require('../Constants.js');
const ExtractAssets = require('./ExtractAssets');

const fs = require('fs')
module.exports = {
  checkMint: async function (Mint, whipAsset) {
    // extract whip name
    const whipName = whipAsset?.onchain_metadata.name || null

    if (whipName) {
      try {
        // search in Mint database to see if asset has already been redeamed and minted
        let whip = await Mint.find({ name: whipName });
        // return true if state is available for whip asset
        return whip[0].state === "AVAILABLE"
      }
      catch {
        return false
      }
    }
    else {
      return false
    }
  },
  changeState: async function (Mint, whipAsset, state, txHash) {

    const whipName = whipAsset?.onchain_metadata.name || null

    if (whipName) {
      // find and update state of whip asset
      try {
        const result = await Mint.updateOne(
          { name: whipName }, // Filter to find the document to update
          { $set: 
            { 
              state: state,
              txHash: txHash 
            } 
          } // Set the new value for the state field
        );
        console.log("asset state updated....")
        return true
      } catch (error) {
        return false
      }
    }
  },
  uploadIPFS: async function (img, dbag, auto) {
    // extract buffer from the image to pass into pinata
    const buff = await img.getBufferAsync("image/png");
    try {
      // ensure buffer is readable for pinata
      const stream = Readable.from(buff);
      const data = new FormData();
      // append form data
      data.append('file', stream, {
        filepath: `${dbag.onchain_metadata.name}_${auto.onchain_metadata.name}.png`
      })
      // post request to pinata
      const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", data, {
        maxBodyLength: "Infinity",
        headers: {
          'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
          Authorization: `Bearer ${process.env.PINATA_JWT}`
        }
      });

      return res.data.IpfsHash;

    } catch (error) {
      console.log(error);
      return null
    }
  },
  updateMetadata: async function (Mint, whipAsset, metadata) {
    const whipName = whipAsset?.onchain_metadata.name || null
    // verify that whipname is called
    if (whipName) {
      // find and update state of whip asset
      try {
        const result = await Mint.updateOne(
          { name: whipName }, // Filter to find the document to update
          { $set: { metadata: JSON.stringify(metadata) } } // Set the new value for the state field
        );
        return true
      } catch (error) {
        return false
      }
    }

  },

  getMetadata: async function (Mint, whipAsset) {
    const whipName = whipAsset?.onchain_metadata.name || null
    // verify that whipname is called
    if (whipName) {
      // find and update state of whip asset
      try {
        const data = await Mint.findOne({ name: whipName }, 'metadata');
        // return data
        return data.metadata
      } 
      catch (error) {
        return false
      }
    }
  },
  txHashExists: async function (Mint, whipAsset){
    const whipName = whipAsset?.onchain_metadata.name || null
    // verify that whipname is called
    if (whipName) {
      // find and update state of whip asset
      try {
        const data = await Mint.findOne({ name: whipName }, 'txHash');
        // return data
        if (!data.txHash)
        {
          return false
        }
        return true
      } 
      catch (error) {
        return true
      }
    }
  },
  // given an address that the 
  assetsExists: async function(address, metadataStr, whipAsset)
  {
    // parse metadata
    const metadata = JSON.parse(metadataStr)
    // get asset number
    const assetNumber = whipAsset.onchain_metadata.name.split("Dbag Mfers Auto Club ")[1]
    // get dbag and auto names
    const dbag = metadata['721'][`${process.env.POLICY_ID}`][`dbagxauto${assetNumber}`]['Dbag']
    const auto = metadata['721'][`${process.env.POLICY_ID}`][`dbagxauto${assetNumber}`]['Auto']
    // instantiante helper class to extract assets
    const extractAssets = new ExtractAssets(address, DBAGS_POLICY, WHIPS_POLICY);
    // get assets in a wallet
    const assets = await extractAssets.getAssets()
    // check if dbag selected exists in the user wallet that is receiving the ada
    const dbagExists = assets.dbags.includes(dbag)
    const whipExists = assets.whips.includes(auto)
    // only mint if the asset does exist
    if (dbagExists && whipExists)
    {
      console.log('asset exists!')
      return true
    }

    return false
  }
};
