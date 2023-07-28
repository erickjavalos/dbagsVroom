const router = require('express').Router();
const fs = require('fs')
const dotenv = require('dotenv');
dotenv.config();

// instantiate nami class and set wallet private key for wallet to use
const DBAGS_GUILD_ID = '954195328062590987'
const client_id = '1106720134615289937';
const client_secret = '-Ds34Uve2kuqW2keDeVVCT5u606DT9WN';
const redirectUrl = 'http://localhost:3001/auth';

const getAuthToken = async (discordCode) => {
  // create payload 
  const payload = new URLSearchParams();
  // append
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

  return await response.json()

}

const getUserInfo = async (Auth) => {
  console.log(Auth.access_token)
  try {
    // endpoints to verify user and discord
    const meEndpoint = 'https://discord.com/api/users/@me';
    const guildsEndpoint = 'https://discord.com/api/users/@me/guilds';

    const meData = await fetch(meEndpoint, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${Auth.access_token}`
      }
    });

    const guildsData = await fetch(guildsEndpoint, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${Auth.access_token}`
      }
    });
    // return object of data from discord
    return {"me" : {...await meData.json()}, "guilds": [...await guildsData.json()]}
  }
  catch (err) {
    console.log(err)
    return 0;
  }
}

// searches through guilds and finds dbag by id
const checkUserInGuild = (guilds) => {
  for (let i = 0; i < guilds.length; i++) {
    // compare with dbags guild id
    if (guilds[i].id === DBAGS_GUILD_ID) {
      return true
    }
  }
  return false
}
// /auth
// instantiate mint process from server
router.get('/', async (req, res) => {
  const discordCode = req.query?.code || false
  // get user information
  if (discordCode) {
    // get auth token object
    const Auth = await getAuthToken(discordCode)
    // verify there is no error using provided discord token
    if (!Auth?.error) {
      // Verify Discord presence
      const userInfo = await getUserInfo(Auth)
      if (userInfo) {
        // verify user is in discord user
        if (checkUserInGuild(userInfo.guilds))
        {
          // TODO: create the user object here with data gathered from userinfo
          res.status(200).json({ ...Auth, "code": discordCode })
        }
        else {
          console.log("user not in guilds")
          // TODO: Reroute to /info page
          res.status(400).json("user not in guilds")
        }
      }
    }
    // token has already been used! or hacker using fake query parameter...
    else {
      // TODO: Reroute to /info page
      res.status(400).json(Auth)
    }

  }
  else {
    // TODO: Reroute to /info page
    res.status(400).json('User did not authenticate')
  }
});

module.exports = router;
