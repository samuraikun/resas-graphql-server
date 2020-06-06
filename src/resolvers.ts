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
  }
};
