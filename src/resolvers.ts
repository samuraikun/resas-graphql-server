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
    middleIndustries: (_, { sicCode }, { dataSources }) => dataSources.resasAPI.getMiddleIndustries(sicCode)
  }
};
