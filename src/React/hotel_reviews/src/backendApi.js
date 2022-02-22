import basicRestRequests from './basicRestRequests.js';


class backendApi extends basicRestRequests
{ 
    static #baseUrl = ":8000/backend/";

  

    static async addNewReview(str)
    {   
        let url = "http://"+ window.location.hostname + this.#baseUrl + "addNewReview";
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
      let url = "http://"+ window.location.hostname + this.#baseUrl + "getAllData";
      let result = await this.GetRequest(url);
      
      let data = JSON.parse(result);
      //console.log(data);
      return data;
    }

  
}

export default backendApi;