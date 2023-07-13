const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const { typeDefs, resolvers } = require('../server/schema');
const { db } = require('../server/config/connection'); // Update import statement

const PORT = process.env.PORT || 3000;
const app = express();

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
    if (process.env.NODE_ENV === 'production') {
      app.use(express.static(path.join(__dirname, '../client/build')));
    }

    // Route for serving the client application
    app.get('/', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/build/index.html'));
    });

    // Additional middleware
    const requestTime = function (req, res, next) {
      req.requestTime = Date.now();
      next();
    };

    app.use(requestTime);

    // Additional route
    app.get('/additional', function (req, res) {
      var responseText = 'Hi Family!<br>';
      responseText += '<small>Requested at: ' + req.requestTime + '</small>';
      res.send(responseText);
    });

    await db; // Wait for the database connection

    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`GraphQL server running at http://localhost:${PORT}${server.graphqlPath}`);
    });
  } catch (error) {
    console.error('Error starting server:', error);
  }
};

startServer();
