const resolvers = {
  Query: {
    prefectures: async (_, __, { dataSources }) => dataSources.resasAPI.getAllPrefectures()
  }
};

module.exports = resolvers;
