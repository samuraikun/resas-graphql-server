const { gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    prefectures: [Prefecture]!
  }

  type Prefecture {
    result: [PrefData]
  }

  type PrefData {
    prefCode: Int,
    prefName: String
  }
`;

module.exports = typeDefs;
