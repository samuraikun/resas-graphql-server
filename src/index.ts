require('dotenv').config();

import { ApolloServer } from 'apollo-server'
import { typeDefs } from './schema'
import { resolvers } from './resolvers'
import { ResasAPI } from './datasources/resas'

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
