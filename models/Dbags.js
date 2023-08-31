const { Schema, model, Types: { ObjectId } } = require('mongoose');

const dbagSchema = new Schema({
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
    Eyes: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
    Mouth: {
      type: String,
    },
    image: {
      type: String,
      required: true,
    },
    Clothes: {
      type: String,
    },
    Special: {
      type: String,
    },
    BodyType: {
      type: String,
    },
    HeadItems: {
      type: String,
    },
    mediaType: {
      type: String,
    },
    Background: {
      type: String,
    },
    HeadPhones: {
      type: String,
    },
    MouthItems: {
      type: String,
    },
    
  },
  onchain_metadata_standard: {
    type: String,
  }
  

}, 
{ _id: true, timestamps: true });


const Dbags = model('Dbags', dbagSchema);

module.exports = Dbags;
