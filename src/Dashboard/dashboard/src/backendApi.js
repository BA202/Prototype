import basicRestRequests from './basicRestRequests.js';


class backendApi extends basicRestRequests
{ 
    static #baseUrl = ":8000/backend/";

  

    static async addNewReview(str)
    {   
      let res = await this.detectLanguage(str);
        let url = "http://"+ window.location.hostname + this.#baseUrl + "addNewReview";
        console.log(url);
        let json = {
          "review": str,
          "setType": "UserInput",
          "source": "Online",
          "language": res
      };
        let result = await this.PostRequest(url,json);
        return result;
    }


  }
export default backendApi;