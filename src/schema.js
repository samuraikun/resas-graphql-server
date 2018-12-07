const { gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    prefectures: [Prefecture]!
  }

  type Prefecture {
    prefCode: Int,
    prefName: String
  }
`;

module.exports = typeDefs;
