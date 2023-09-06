const { Schema, model } = require('mongoose');

const walletSchema = new Schema({
    stakeAddress: {
        type: String,
        unique: true,  // ensures stakeAddress is unique across documents
        required: true,  // ensures stakeAddress must be provided
        index: true  // makes querying by stakeAddress faster
    },
    dbagAssets: {
        type: [String],
    },
    autoAssets: {
        type: [String],
    }
});

const Wallets = model('Wallets', walletSchema);

module.exports = Wallets;
