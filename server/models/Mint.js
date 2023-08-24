const { Schema, model } = require('mongoose');

const mintSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    state: {
        type: String,
        require: true,
        trim: true
    },
    metadata: {
        type: String,
        trim: true
    },
    txHash:
    {
        type: String,
        trim: true
    }
});

const Mint = model('Mint', mintSchema);

module.exports = Mint;
