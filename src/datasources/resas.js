const _ = require('lodash');
const { RESTDataSource } = require('apollo-datasource-rest');

class ResasAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://opendata.resas-portal.go.jp';
  }

  willSendRequest(request) {
    request.headers.set('X-API-KEY', process.env.RESAS_API_KEY);
  }

  async getAllPrefectures() {
    let res = await this.get('api/v1/prefectures');
    res = _.omitBy(res, _.isNull);
    return res && res.result.length ? res.result.map(data => this.prefReducer(data)) : [];
  }

  prefReducer(result) {
    return {
      prefCode: result.prefCode,
      prefName: result.prefName
    }
  }

  async getBroadIndustries() {
    let res = await this.get('api/v1/industries/broad');
    res = _.omitBy(res, _.isNull);
    return res && res.result.length ? res.result.map(data => this.industryReducer(data)) : [];
  }

  industryReducer(result) {
    return {
      sicCode: result.sicCode,
      sicName: result.sicName
    }
  }
}

module.exports = ResasAPI;
