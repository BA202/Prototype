class basicRestRequests
{
    static PostRequest(url , json) {
        console.log(url);
        let data = JSON.stringify(json);
      return new Promise(function (resolve, reject) {
          let xhr = new XMLHttpRequest();
          xhr.withCredentials = true;
          xhr.open("POST", url);
          xhr.setRequestHeader("Content-Type", "application/json");
          xhr.onload = function () {
              resolve(xhr);
          };
          xhr.send(data);
      });
    }


    static PostRequestWithPDfDownload(url , json) {
        console.log(url);
        let data = JSON.stringify(json);
      return new Promise(function (resolve, reject) {
          let xhr = new XMLHttpRequest();
          xhr.withCredentials = true;
          xhr.open("POST", url);
          xhr.setRequestHeader("Content-Type", "application/json");
          xhr.responseType = 'arraybuffer';
          xhr.onload = function () {
              resolve(xhr);
          };
          xhr.send(data);
      });
    }

    static PostRequestWithJWT(url , json ,jwt) {
        console.log(url);
        let data = JSON.stringify(json);
      return new Promise(function (resolve, reject) {
          let xhr = new XMLHttpRequest();
          xhr.withCredentials = true;
          xhr.open("POST", url);
          xhr.setRequestHeader("Content-Type", "application/json");
          xhr.setRequestHeader("Authorization", 'Bearer ' + jwt );
          xhr.onload = function () {
              resolve(xhr);
          };
          xhr.send(data);
      });
    }

    static GetRequest(url) {
        console.log(url);
      return new Promise(function (resolve, reject) {
          let xhr = new XMLHttpRequest();
          xhr.open("GET", url);
          xhr.onload = function () {
              resolve(xhr.response);
          };
          xhr.send();
      });
    }

    static GetRequestWithJWT(url, jwt) {
        console.log(url);
      return new Promise(function (resolve, reject) {
          let xhr = new XMLHttpRequest();
          xhr.withCredentials = true;
          xhr.open("GET", url);
          xhr.setRequestHeader("Authorization", 'Bearer ' + jwt );
          xhr.onload = function () {
              resolve(xhr.response);
          };
          xhr.send();
      });
    }

    static DeleteRequest(url, jwt) {
        console.log(url);
      return new Promise(function (resolve, reject) {
          let xhr = new XMLHttpRequest();
          xhr.withCredentials = true;
          xhr.open("DELETE", url);
          xhr.setRequestHeader("Authorization", 'Bearer ' + jwt );
          xhr.onload = function () {
              resolve(xhr.response);
          };
          xhr.send();
      });
    }

}

export default basicRestRequests;


