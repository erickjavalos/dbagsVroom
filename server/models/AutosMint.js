const { Schema, model, Types: { ObjectId } } = require('mongoose');

const autosSchema = new Schema({
  asset: {
    type: String,
    required: true,
    unique: true,
  },
  policy_id: {
    type: String,
    required: true,
  },
  // hex encoded
  asset_name: {
    type: String,
    required: true,
  },
  fingerprint: {
    type: String,
  },
  quantity: {
    type: String,
  },
  initial_mint_tx_hash: {
    type: String,
  },
  mint_or_burn_count: {
    type: String,
  },
  image: {
    type: String,
  },
  // metadata
  onchain_metadata: {
    name: {
      type: String,
    },
    Car: {
      type: String,
    },
    Background: {
      type: String,
    },
    ExhaustFumes: {
      type: String,
    },
    image: {
      type: String,
    }
  },
  onchain_metadata_standard: {
    type: String,
  }, 
  minted: {
    type: String
  }
  

}, 
{ _id: true, timestamps: true });


const Autos = model('AutosMint', autosSchema);

module.exports = Autos;
