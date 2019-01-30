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
    broadIndustries: [BroadIndustry]!
  }

  type BroadIndustry {
    sicCode: String
    sicName: String
  }
`;

module.exports = typeDefs;
