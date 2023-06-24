const { Schema, model, Types: { ObjectId } } = require('mongoose');

const dbagSchema = new Schema({
  assetName: {
    type: String,
    required: true,
    unique: true,
  },
  ipfs: {
    type: String,
    required: true,
    unique: true
  }
}, 
{ _id: true, timestamps: true });


const Dbags = model('Dbags', dbagSchema);

module.exports = Dbags;
