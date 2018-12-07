const resolvers = {
  Query: {
    prefectures: async ({ dataSources  }) => dataSources.resasAPI.getAllPrefectures()
  }
};

module.exports = resolvers;
