const { Schema, model, Types: { ObjectId } } = require('mongoose');

const autosSchema = new Schema({
  assetName: {
    type: String,
    required: true,
    unique: true,
  },
  ipfs: {
    type: String,
    required: true,
  }
}, 
{ _id: true, timestamps: true });


const Autos = model('Autos', autosSchema);

module.exports = Autos;
