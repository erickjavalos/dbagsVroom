const { Dbags, Autos } = require('../server/../models');

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
    getAsset: async (parent, { id }) => {
      const asset = await Dbags.findById(id).exec();
      return asset;
    },
    getAllAssets: async () => {
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


  