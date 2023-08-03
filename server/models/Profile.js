const { Schema, model } = require('mongoose');

const profileSchema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  discordId: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, 'Must match an email address!'],
  },
  addresses: [
    {
      type: String,
      trim: true,
    },
  ],
});

const Profile = model('Profile', profileSchema);

module.exports = Profile;
