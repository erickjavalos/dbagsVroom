const { ApolloServer } = require('apollo-server-express');

const typeDefs = require('./typeDefs'); 
const resolvers = require('./resolvers');

module.exports = { typeDefs, resolvers };