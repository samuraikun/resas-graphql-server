const { gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    prefectures: [Prefecture]!
    industries(
      pageSize: Int
      after: String
    ): IndustryConnection!
  }

  type Prefecture {
    prefCode: Int
    prefName: String
  }

  type IndustryConnection {
    cursor: String!
    hasMore: Boolean!
    industries: [Industry]!
  }

  type Industry {
    sicCode: String
    sicName: String
  }
`;

module.exports = typeDefs;
