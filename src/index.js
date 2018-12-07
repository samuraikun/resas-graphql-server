require('dotenv').config();

const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const ResasAPI = require('./datasources/resas');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    resasAPI: new ResasAPI()
  })
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
