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
  // metadata
  onchain_metadata: {
    Car: {
      type: String,
    },
    Background: {
      type: String,
    },
    ExhaustFumes: {
      type: String,
    },
  },
  onchain_metadata_standard: {
    type: String,
  }
  

}, 
{ _id: true, timestamps: true });


const Autos = model('Autos', autosSchema);

module.exports = Autos;
