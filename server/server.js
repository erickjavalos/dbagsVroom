const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const path = require("path");
const { typeDefs, resolvers } = require("../server/schema");
const { db } = require("../server/config/connection"); // Update import statement
const routes = require('./routes/')
const jwt = require("jsonwebtoken");

// TEST
const fetch = require('node-fetch');

const PORT = process.env.PORT || 3001;
const app = express();

// Access the secret key from the environment variable
const jwtSecretKey = process.env.JWT_SECRET;

const client_id = '1106720134615289937';
const client_secret = '-Ds34Uve2kuqW2keDeVVCT5u606DT9WN';
const redirect_uri = 'http://localhost:3000/home';
const authorization_code = 'RML6okBr39QVgq2m6UdWWt3GxgBuEU';
const scopes = 'identity';

// Create a new instance of ApolloServer with the GraphQL schema
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Start the server and connect to MongoDB
const startServer = async () => {
  try {
    await server.start(); // Await the server start
    server.applyMiddleware({ app }); // Apply middleware after server start

    // Configure body parsing for JSON and URLencoded data
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());

    // Serve static assets in production
    if (process.env.NODE_ENV === "production") {
      app.use(express.static(path.join(__dirname, "../client/build")));
    }

    // Route for serving the client application
    app.get("/", (req, res) => {
      res.sendFile(path.join(__dirname, "../client/build/index.html"));
    });

    // Discord hash verification and JWT generation endpoint
    app.post("/api/verify", async (req, res) => {
      const { hash } = req.body;

      try {
        // Perform the necessary validation or verification for the hash
        // You can use the hash to query the database or perform any other required checks

        // Assuming verification is successful, retrieve user information from your data source
        const username = "John Doe";
        const email = "johndoe@example.com";

        // Generate a JWT for the user
        const token = jwt.sign({ hash }, jwtSecretKey, { expiresIn: "1h" });

        // Send the user information and JWT back to the frontend
        res.json({ username, email, token });
      } catch (error) {
        console.error("Error retrieving user:", error);
        res.status(500).json({ error: "Server error" });
      }
    });

    // Additional middleware
    const requestTime = function (req, res, next) {
      req.requestTime = Date.now();
      next();
    };

    app.use(requestTime);

    // Additional route
    app.get("/additional", function (req, res) {
      var responseText = "Hi Family!<br>";
      responseText += "<small>Requested at: " + req.requestTime + "</small>";
      res.send(responseText);
    });

    // sets up authorization for us to use
    app.get("/auth", async function (req, res) {
      const discordCode = req.query?.code || false
      console.log('/auth')
      console.log(discordCode)
      // check if user is in dbags discord
      // get user information
      if (discordCode) {
        var redirectUrl = 'http://localhost:3001/auth';

        // res.status(200).json('hello')
        const payload = new URLSearchParams();
        payload.append('client_id', client_id);
        payload.append('client_secret', client_secret);
        payload.append('grant_type', 'authorization_code');
        payload.append('code', discordCode);
        payload.append('redirect_uri', redirectUrl);
        // payload.append('scope', scopes);
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
        console.log(data)

        // return fetch(url, {
        //   method: "POST",
        // })
        //   .then((res) => res.json())
        //   .then((data) => {
        //     return data;
        //   });
        // return res.redirect(301, redirectUrl);
        res.status(200).json({...data, "code": discordCode})
      }
      else {
        res.status(400).json('User did not authenticate')
      }

    });

    // app.use(routes);

    await db; // Wait for the database connection

    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(
        `GraphQL server running at http://localhost:${PORT}${server.graphqlPath}`
      );
    });
  } catch (error) {
    console.error("Error starting server:", error);
  }
};

startServer();
