const { paginateResults } = require('./util');

const resolvers = {
  Query: {
    prefectures: async (_, __, { dataSources }) => dataSources.resasAPI.getAllPrefectures(),
    industries: async (_, { pageSize = 5, after }, { dataSources }) => {
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
    }
  }
};

module.exports = resolvers;
