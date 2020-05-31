import { gql } from 'apollo-server'

export const typeDefs = gql`
  type Query {
    prefectures: [Prefecture]!
    cities(prefCode: ID!): [City]!
    industries(
      pageSize: Int
      after: String
    ): IndustryConnection!
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
