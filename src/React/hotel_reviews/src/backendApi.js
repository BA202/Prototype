import basicRestRequests from './basicRestRequests.js';


class backendApi extends basicRestRequests
{ 
    static #baseUrl = "http://127.0.0.1:5003/";



    static async addNewReview(str)
    {   
        let url = this.#baseUrl + "addNewReview";
        console.log(url);
        let json = {
          "review": str,
          "setType": "Training",
          "source": "Online",
          "language": "Deutsch"
      };
        let result = await this.PostRequest(url,json);
        return result;
    }

    static async getReviews()
    {
      let url = this.#baseUrl + "getAllData";
      let result = await this.GetRequest(url);
      console.log(result);
      let data = JSON.parse(result);
      return data;
    }

  
}

export default backendApi;