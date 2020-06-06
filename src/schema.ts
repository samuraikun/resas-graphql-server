import { gql } from 'apollo-server'

export const typeDefs = gql`
  type Query {
    prefectures: [Prefecture]!
    cities(prefCode: ID!): [City]!
    broadIndustries(
      pageSize: Int
      after: String
    ): BroadIndustryConnection!
    middleIndustries(sicCode: ID!): [MiddleIndustry]!
    narrowIndustries(simcCode: ID!): [NarrowIndustry]!,
    broadJobs: [BroadJob]!,
    middleJobs(iscoCode: ID!): [MiddleJob]!
    broadPatents: [BroadPatent]!
    middlePatents(tecCode: ID!): [MiddlePatent]!
    patentLocations(prefCode: ID!, cityCode: ID!): [PatentLocation]!
    customs(prefCode: ID!): [Customs]!
    regions: [Region]!
    countries(regionCode: ID!): [Country]!
    agricultureDepartments: [AgricultureDepartment]!
    broadTradeInfoItems: [BroadTradeInfoItem]!
    middleTradeInfoItems(itemCode1: ID!): [MiddleTradeInfoItem]!
    narrowTradeInfoItems(itemCode1: ID!, itemCode2: ID!): [NarrowTradeInfoItem]!
    populations(prefCode: ID!, cityCode: ID!, addArea: String): PopulationComposition
    populationPyramid(prefCode: ID!, cityCode: ID!, yearLeft: ID!, yearRight: ID!, addArea: ID): PopulationPyramid
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

  type NarrowIndustry {
    simcCode: String
    siscCode: String
    siscName: String
  }

  type BroadJob {
    iscoCode: String
    iscoName: String
  }

  type MiddleJob {
    iscoCode: String
    ismcoCode: String
    ismcoName: String
  }

  type BroadPatent {
    tecCode: String
    tecName: String
  }

  type MiddlePatent {
    tecCode: String
    tecName: String
    themeCode: String
    themeName: String
  }

  type PatentLocation {
    prefCode: String
    prefName: String
    cityCode: String
    cityName: String
    id: String
    latitude: Float
    longitude: Float
  }

  type Customs {
    customHouseCode: String
    customHouseName: String
    prefCode: String
    prefName: String
  }

  type Region {
    regionCode: String
    regionName: String
  }

  type Country {
    regionCode: String
    regionName: String
    countryCode: String
    countryName: String
    remarks: String
  }

  type AgricultureDepartment {
    sectionCode: String
    sectionName: String
  }

  type BroadTradeInfoItem {
    itemCode1: String
    itemName1: String
  }

  type MiddleTradeInfoItem {
    itemCode1: String
    itemName1: String
    itemCode2: String
    itemName2: String
  }

  type NarrowTradeInfoItem {
    itemCode1: String
    itemName1: String
    itemCode2: String
    itemName2: String
    itemCode3: String
    itemName3: String
  }

  type PopulationComposition {
    boundaryYear: Int
    data: [PopulationCompositionConnection]
  }

  type PopulationCompositionConnection {
    label: String
    data: [PopulationData]
  }

  type PopulationData {
    year: Int!
    value: Int!
    rate: Float
  }

  type PopulationPyramid {
    yearLeft: PopulationPyramidYear
    yearRight: PopulationPyramidYear
  }

  type PopulationPyramidYear {
    year: Int
    oldAgeCount: Int
    oldAgePercent: Int
    middleAgeCount: Int
    middleAgePercent: Int
    newAgeCount: Int
    newAgePercent: Int
    data: [PopulationPyramidData]
  }

  type PopulationPyramidData {
    class: String
    man: Int
    manPercent: Float
    woman: Int
    womanPercent: Float
  }
`;
