const router = require('express').Router();
const fs = require('fs')
const dotenv = require('dotenv');
dotenv.config();

// instantiate nami class and set wallet private key for wallet to use

const client_id = '1106720134615289937';
const client_secret = '-Ds34Uve2kuqW2keDeVVCT5u606DT9WN';
const redirectUrl = 'http://localhost:3001/auth';

// /auth
// instantiate mint process from server
router.get('/', async (req, res) => {
  const discordCode = req.query?.code || false
  console.log('/auth')
  console.log(discordCode)
  // check if user is in dbags discord
  // get user information
  if (discordCode) {
    const payload = new URLSearchParams();
    payload.append('client_id', client_id);
    payload.append('client_secret', client_secret);
    payload.append('grant_type', 'authorization_code');
    payload.append('code', discordCode);
    payload.append('redirect_uri', redirectUrl);
    // grab secrets
    let url = `https://discord.com/api/v10/oauth2/token`;

    const response = await fetch(url, {
      method: 'POST',
      body: payload,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    const data = await response.json();

    res.status(200).json({...data, "code": discordCode})
  }
  else {
    res.status(400).json('User did not authenticate')
  }
});

module.exports = router;
