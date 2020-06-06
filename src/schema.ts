import { gql } from 'apollo-server'

export const typeDefs = gql`
  type Query {
    prefectures: [Prefecture]!
    cities(prefCode: ID!): [City]!
    broadIndustries(
      pageSize: Int
      after: String
    ): BroadIndustryConnection!
    middleIndustries(sicCode: ID!): [MiddleIndustry]
  }

  type Prefecture {
    prefCode: Int
    prefName: String
  }

  type City {
    prefCode: ID!
    cityCode: Int
    cityName: String
    bigCityFlag: String
  }

  type BroadIndustryConnection {
    cursor: String!
    hasMore: Boolean!
    broadIndustries: [BroadIndustry]!
  }

  type BroadIndustry {
    sicCode: String
    sicName: String
  },

  type MiddleIndustry {
    sicCode: String
    simcCode: String
    simcName: String
  }
`;
