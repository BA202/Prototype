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

    static async detectLanguage(str)
    {
      let url = "http://"+ window.location.hostname + this.#baseUrl + "detectLanguage";
      console.log(url);
      let json = {"Sen": str};
      let result = await this.PostRequest(url,json);
      let shortLan = JSON.parse(result.response)["language"];
      if(shortLan === "deu"){
        return "German";
      }
      else{
        return "English";
      }
    }

    static async addClassifiedReview(data)
    {   
        let url = "http://"+ window.location.hostname + this.#baseUrl + "addClassifiedReview";
        console.log(url);
        let result = await this.PostRequest(url,data);
        return result;

    }
    

    static async classifyReview(str)
    {    
        let res = await this.detectLanguage(str);
        let url = "http://"+ window.location.hostname + this.#baseUrl + "classifyReview";
        console.log(url);
        let json = {
          "review": str,
          "lan":res
      };
        let result = await this.PostRequest(url,json);
        return result;
    }

    static async getAllReviews()
    {
      let url = "http://"+ window.location.hostname + this.#baseUrl + "getAllData";
      let result = await this.GetRequest(url);
      
      let data = JSON.parse(result);
      console.log(data);
      return data;
    }

    static async getTrainingData()
    {
      let url = "http://"+ window.location.hostname + this.#baseUrl + "getAllTraningData";
      let result = await this.GetRequest(url);
      
      let data = JSON.parse(result);
      console.log(data);
      return data;
    }

    static async getUserInputData()
    {
      let url = "http://"+ window.location.hostname + this.#baseUrl + "getAllUserInputData";
      let result = await this.GetRequest(url);
      
      let data = JSON.parse(result);
      console.log(data);
      return data;
    }

    static async getReviewExamples()
    {
      let url = "http://"+ window.location.hostname + this.#baseUrl + "getReviewExamples";
      let result = await this.GetRequest(url);
      
      let data = JSON.parse(result);
      console.log(data);
      return data;
    }

  
}

export default backendApi;