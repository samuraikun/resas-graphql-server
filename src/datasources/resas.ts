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

  async getNarrowIndustries(simcCode) {
    let res = await this.get('api/v1/industries/narrow', { simcCode });
    res = _.omitBy(res, _.isNull);
    return res && res.result.length ? res.result.map(data => this.narrowIndustryReducer(data)) : [];
  }

  narrowIndustryReducer(result) {
    return {
      simcCode: result.simcCode,
      siscCode: result.siscCode,
      siscName: result.siscName
    }
  }

  async getBroadJobs() {
    let res = await this.get('api/v1/jobs/broad');
    res = _.omitBy(res, _.isNull);
    return res && res.result.length ? res.result.map(data => this.broadJobReducer(data)) : [];
  }

  broadJobReducer(result) {
    return {
      iscoCode: result.iscoCode,
      iscoName: result.iscoName
    }
  }

  async getMiddleJobs(iscoCode) {
    let res = await this.get('api/v1/jobs/middle', { iscoCode });
    res = _.omitBy(res, _.isNull);
    return res && res.result.length ? res.result.map(data => this.middleJobReducer(data)) : [];
  }

  middleJobReducer(result) {
    return {
      iscoCode: result.iscoCode,
      ismcoCode: result.ismcoCode,
      ismcoName: result.ismcoName
    }
  }

  async getBroadPatents() {
    let res = await this.get('api/v1/patents/broad');
    res = _.omitBy(res, _.isNull);
    return res && res.result.length ? res.result.map(data => this.broadPatentReducer(data)) : [];
  }

  broadPatentReducer(result) {
    return {
      tecCode: result.tecCode,
      tecName: result.tecName
    }
  }

  async getMiddlePatents(tecCode) {
    let res = await this.get('api/v1/patents/middle', { tecCode });
    res = _.omitBy(res, _.isNull);
    return res && res.result.length ? res.result.map(data => this.middlePatentReducer(data)) : [];
  }

  middlePatentReducer(result) {
    return {
      tecCode: result.tecCode,
      tecName: result.tecName,
      themeCode: result.themeCode,
      themeName: result.themeName
    }
  }

  async getPatentLocations(prefCode, cityCode) {
    let res = await this.get('api/v1/patents/locations', { prefCode, cityCode });
    res = _.omitBy(res, _.isNull);
    return res && res.result.length ? res.result.map(data => this.patentLocationReducer(data)) : [];
  }

  patentLocationReducer(result) {
    return {
      id: result.id,
      prefCode: result.prefCode,
      prefName: result.prefName,
      cityCode: result.cityCode,
      cityName: result.cityName,
      latitude: result.latitude,
      longitude: result.longitude
    }
  }

  async getCustoms(prefCode) {
    let res = await this.get('api/v1/customs', { prefCode });
    res = _.omitBy(res, _.isNull);
    return res && res.result.length ? res.result.map(data => this.customsReducer(data)) : [];
  }

  customsReducer(result) {
    return {
      prefCode: result.prefCode,
      prefName: result.prefName,
      customHouseCode: result.customHouseCode,
      customHouseName: result.customHouseName
    }
  }

  async getRegions() {
    let res = await this.get('api/v1/regions/broad');
    res = _.omitBy(res, _.isNull);
    return res && res.result.length ? res.result.map(data => this.regionReducer(data)) : [];
  }

  regionReducer(result) {
    return {
      regionCode: result.regionCode,
      regionName: result.regionName
    }
  }

  async getCountries(regionCode) {
    let res = await this.get('api/v1/regions/middle', { regionCode });
    res = _.omitBy(res, _.isNull);
    return res && res.result.length ? res.result.map(data => this.countryReducer(data)) : [];
  }

  countryReducer(result) {
    return {
      regionCode: result.regionCode,
      regionName: result.regionName,
      countryCode: result.countryCode,
      countryName: result.countryName,
      remarks: result.remarks
    }
  }

  async getAgricultureDepartments() {
    let res = await this.get('api/v1/regions/agricultureDepartments');
    res = _.omitBy(res, _.isNull);
    return res && res.result.length ? res.result.map(data => this.agricultureDepartmentReducer(data)) : [];
  }

  agricultureDepartmentReducer(result) {
    return {
      sectionCode: result.sectionCode,
      sectionName: result.sectionName
    }
  }

  async getBroadTradeInfoItems() {
    let res = await this.get('api/v1/tradeInfoItemTypes/broad');
    res = _.omitBy(res, _.isNull);
    return res && res.result.length ? res.result.map(data => this.broadTradeInfoItemReducer(data)) : [];
  }

  broadTradeInfoItemReducer(result) {
    return {
      itemCode1: result.itemCode1,
      itemName1: result.itemName1
    }
  }

  async getMiddleTradeInfoItems(itemCode1) {
    let res = await this.get('api/v1/tradeInfoItemTypes/middle', { itemCode1 });
    res = _.omitBy(res, _.isNull);
    return res && res.result.length ? res.result.map(data => this.middleTradeInfoItemReducer(data)) : [];
  }

  middleTradeInfoItemReducer(result) {
    return {
      itemCode1: result.itemCode1,
      itemName1: result.itemName1,
      itemCode2: result.itemCode2,
      itemName2: result.itemName2,
    }
  }

  async getNarrowTradeInfoItems(itemCode1, itemCode2) {
    let res = await this.get('api/v1/tradeInfoItemTypes/narrow', { itemCode1, itemCode2 });
    res = _.omitBy(res, _.isNull);
    return res && res.result.length ? res.result.map(data => this.narrowTradeInfoItemReducer(data)) : [];
  }

  narrowTradeInfoItemReducer(result) {
    return {
      itemCode1: result.itemCode1,
      itemName1: result.itemName1,
      itemCode2: result.itemCode2,
      itemName2: result.itemName2,
      itemCode3: result.itemCode3,
      itemName3: result.itemName3,
    }
  }

  async getPopulations(prefCode, cityCode, addArea) {
    const params = addArea ? { prefCode, cityCode, addArea } : { prefCode, cityCode } 
    let res = await this.get('api/v1/population/composition/perYear', params);
    res = _.omitBy(res, _.isNull);
    return this.populationReducer(res);
  }

  populationReducer(response) {
    const { result } = response;

    if (!result && result.data.length <= 0) { return {} };

    const data = result.data.map(data => {
      return {
        label: data.label,
        data: data.data
      }
    })

    return {
      boundaryYear: result.boundaryYear,
      data
    }
  }

  async getPopulationPyramid(prefCode, cityCode, yearLeft, yearRight, addArea) {
    const params = addArea ? { prefCode, cityCode, yearLeft, yearRight, addArea } : { prefCode, cityCode, yearLeft, yearRight }
    let res = await this.get('api/v1/population/composition/pyramid', params)
    res = _.omitBy(res, _.isNull)
    return this.populationPyramidReducer(res)
  }

  populationPyramidReducer(response) {
    const { result } = response

    if (!result) { return {} }

    return result
  }
}
