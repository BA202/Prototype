import basicRestRequests from './basicRestRequests.js';


class backendApi extends basicRestRequests {
  //static #baseUrl = ":8000/backend/";
  static #baseUrl = ":5003/";



  static async getViewData(data) {
    let url = "http://" + window.location.hostname + this.#baseUrl + "getViewData";
    console.log(url);
    let result = await this.PostRequest(url, data);
    return JSON.parse(result.response);
  }

  static async getTextViewData(data) {
    let url = "http://" + window.location.hostname + this.#baseUrl + "getTextViewData";
    console.log(url);
    let result = await this.PostRequest(url, data);
    return JSON.parse(result.response);
  }


}
export default backendApi;