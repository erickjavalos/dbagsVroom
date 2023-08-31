const express = require('express');
require('dotenv').config();
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const { authMiddleware } = require('./utils/auth');
const buildPath = path.join(__dirname, './dist');
console.log(__dirname)

const { typeDefs, resolvers } = require('./schema/index.js');
console.log(typeDefs)
console.log(__dirname)
// const {db} = require('./config/connection');

const PORT = process.env.PORT || 3001

const app = express();

// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
//   context: authMiddleware,
//   persistedQueries: false
// });

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(buildPath));



if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'));
  });
}

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  server.applyMiddleware({ app });
  
  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    })
  })
  };
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    // console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  })
  
// Call the async function to start the server
// startApolloServer(typeDefs, resolvers);
