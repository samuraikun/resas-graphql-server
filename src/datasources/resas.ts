import * as _ from 'lodash'
import { RESTDataSource } from 'apollo-datasource-rest'

export class ResasAPI extends RESTDataSource {
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

  async getAllCities(prefCode) {
    let res = await this.get('api/v1/cities', { prefCode });
    res = _.omitBy(res, _.isNull);
    return res && res.result.length ? res.result.map(data => this.cityReducer(data)) : [];
  }

  cityReducer(result) {
    return {
      prefCode: result.prefCode,
      cityCode: result.cityCode,
      cityName: result.cityName,
      bigCityFlag: result.bigCityFlag
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

  async getMiddleIndustries(sicCode) {
    let res = await this.get('api/v1/industries/middle', { sicCode });
    res = _.omitBy(res, _.isNull);
    return res && res.result.length ? res.result.map(data => this.middleIndustryReducer(data)) : [];
  }

  middleIndustryReducer(result) {
    return {
      sicCode: result.sicCode,
      simcCode: result.simcCode,
      simcName: result.simcName
    }
  }
}
