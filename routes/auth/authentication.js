const router = require('express').Router();
const fs = require('fs')
const dotenv = require('dotenv');
const jwt = require("jsonwebtoken");
const { getAuthToken } = require('../../utils/auth');

dotenv.config();

// instantiate nami class and set wallet private key for wallet to use
const DBAGS_GUILD_ID = '954195328062590987'



const getUserInfo = async (Auth) => {
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
          res.status(200).json('User exists in guild')
        }
        else {
          console.log("user not in guilds")
          const access_token = Auth.access_token
          // TODO: Reroute to /info page
          const token = jwt.sign({ access_token }, jwtSecretKey, { expiresIn: "1h" });
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


router.get('/testDiscord', (req, res) => {
  res.redirect([
    'https://discord.com/api/oauth2/authorize?client_id=1106720134615289937&redirect_uri=http%3A%2F%2Flocalhost%3A3001%2Fauth%2Fauthorize&response_type=code&scope=guilds%20identify%20email'
  ].join(''));
});

router.get('/authorize', async (req, res) => {
  const code = req.query.code;
  const Auth = await getAuthToken(code)
  console.log(code, Auth)
  const userInfo = await getUserInfo(Auth)

  console.log(userInfo)
  res.json(userInfo)
})

  // const cred = btoa(`${cfg.id}:${cfg.secret}`);
//   post(`https://discordapp.com/api/oauth2/token?grant_type=authorization_code&code=${code}`)
//     .set('Authorization', `Basic ${cred}`)
//     .then(response => res.redirect(`/guilds?token=${response.body.access_token}`))
//     .catch(console.error);
// });

router.get('/guilds', (req, res) => {
  // get('https://discordapp.com/api/v6/users/@me/guilds')
  //   .set('Authorization', `Bearer ${req.query.token}`)
  //   .then(response => res.json(response.body))
  //   .catch(console.error);
});

module.exports = router;
