import { paginateResults } from './util'
import { IResolvers } from 'apollo-server'

export const resolvers: IResolvers = {
  Query: {
    prefectures: (_, __, { dataSources }) => dataSources.resasAPI.getAllPrefectures(),
    cities: (_, { prefCode }, { dataSources }) => dataSources.resasAPI.getAllCities(prefCode),
    broadIndustries: async (_, { pageSize = 5, after }, { dataSources }) => {
      const allBroadIndustries = await dataSources.resasAPI.getBroadIndustries();

      const broadIndustries = paginateResults({
        after,
        pageSize,
        results: allBroadIndustries
      });

      return {
        broadIndustries,
        cursor: broadIndustries.length ? broadIndustries[broadIndustries.length - 1].cursor : null,
        hasMore: broadIndustries.length ? broadIndustries[broadIndustries.length - 1].cursor !== allBroadIndustries[allBroadIndustries.length - 1].cursor : false
      }
    },
    middleIndustries: (_, { sicCode }, { dataSources }) => dataSources.resasAPI.getMiddleIndustries(sicCode),
    narrowIndustries: (_, { simcCode }, { dataSources }) => dataSources.resasAPI.getNarrowIndustries(simcCode),
    broadJobs: (_, __, { dataSources }) => dataSources.resasAPI.getBroadJobs(),
    middleJobs: (_, { iscoCode }, { dataSources }) => dataSources.resasAPI.getMiddleJobs(iscoCode),
    broadPatents: (_, __, { dataSources }) => dataSources.resasAPI.getBroadPatents(),
    middlePatents: (_, { tecCode }, { dataSources }) => dataSources.resasAPI.getMiddlePatents(tecCode),
    patentLocations: (_, { prefCode, cityCode }, { dataSources }) => dataSources.resasAPI.getPatentLocations(prefCode, cityCode),
    customs: (_, { prefCode }, { dataSources }) => dataSources.resasAPI.getCustoms(prefCode),
    regions: (_, __, { dataSources }) => dataSources.resasAPI.getRegions(),
    countries: (_, { regionCode }, { dataSources }) => dataSources.resasAPI.getCountries(regionCode),
    agricultureDepartments: (_, __, { dataSources }) => dataSources.resasAPI.getAgricultureDepartment(),
    broadTradeInfoItems: (_, __, { dataSources }) => dataSources.resasAPI.getBroadTradeInfoItems(),
    middleTradeInfoItems: (_, { itemCode1 }, { dataSources }) => dataSources.resasAPI.getMiddleTradeInfoItems(itemCode1),
    narrowTradeInfoItems: (_, { itemCode1, itemCode2 }, { dataSources }) => dataSources.resasAPI.getNarrowTradeInfoItems(itemCode1, itemCode2),
    populations: (_, { prefCode, cityCode, addArea }, { dataSources }) => dataSources.resasAPI.getPopulations(prefCode, cityCode, addArea),
    populationPyramid: (_, { prefCode, cityCode, yearLeft, yearRight, addArea }, { dataSources }) => dataSources.resasAPI.getPopulationPyramid(prefCode, cityCode, yearLeft, yearRight, addArea),
    populationChangeRate: (_, { prefCode, cityCode, addArea }, { dataSources }) => dataSources.resasAPI.getPopulationChangeRate(prefCode, cityCode, addArea),
    wages: (_, { prefCode, sicCode, simcCode , wagesAge }, { dataSources }) => dataSources.resasAPI.getWages(prefCode, sicCode, simcCode, wagesAge),
  },
  WagesAge: {
    ALL: 1,
    UNTIL_19: 2,
    BETWEEN_20_AND_24: 3,
    BETWEEN_25_AND_29: 4,
    BETWEEN_30_AND_34: 5,
    BETWEEN_35_AND_39: 6,
    BETWEEN_40_AND_44: 7,
    BETWEEN_45_AND_49: 8,
    BETWEEN_50_AND_54: 9,
    BETWEEN_55_AND_59: 10,
    BETWEEN_60_AND_64: 11,
    BETWEEN_65_AND_69: 12,
    SINCE_70: 13
  }
};
