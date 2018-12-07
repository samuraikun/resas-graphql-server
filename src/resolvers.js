const { paginateResults } = require('./util');

const resolvers = {
  Query: {
    prefectures: async (_, __, { dataSources }) => dataSources.resasAPI.getAllPrefectures(),
    industries: async (_, { pageSize = 5, after }, { dataSources }) => {
      const allIndustry = await dataSources.resasAPI.getAllIndustry();
      allIndustry.reverse();

      const industries = paginateResults({
        after,
        pageSize,
        results: allIndustry
      });

      return {
        industries,
        cursor: industries.length ? industries[industries.length - 1].cursor : null,
        hasMore: industries.length ? industries[industries.length - 1].cursor !== allIndustry[allIndustry.length - 1].cursor : false
      }
    }
  }
};

module.exports = resolvers;
