const jwt = require('jsonwebtoken');
require('dotenv').config()

const secret = process.env.SECRET;
const expiration = '2h';


// GLOBAL 
const DBAGS_GUILD_ID = '954195328062590987'
const client_id = '1106720134615289937';
const client_secret = '-Ds34Uve2kuqW2keDeVVCT5u606DT9WN';
const redirectUrl = 'http://localhost:3000/auth';


module.exports = {
  authMiddleware: function ({ req }) {
    let token = req.body.token || req.query.token || req.headers.authorization;

    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    if (!token) {
      return req;
    }

    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {
      console.log('Invalid token');
    }

    return req;
  },
  signToken: function ({ email, username, _id }) {
    const payload = { email, username, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },

  getAuthToken: async (discordCode) => {
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
  
  },
  getUserInfo:  async (Auth) => {
    // console.log(Auth.access_token)
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
  },
  checkUserInGuild:  (guilds) => {
    for (let i = 0; i < guilds.length; i++) {
      // compare with dbags guild id
      if (guilds[i].id === DBAGS_GUILD_ID) {
        return true
      }
    }
    return false
  }

};
