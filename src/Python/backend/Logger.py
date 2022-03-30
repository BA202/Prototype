import requests
import json

class LogType:
    Emergency = "Emergency"
    Alert = "Alert"
    Critical = "Critical"
    Error = "Error"
    Warning = "Warning"
    Notice = "Notice"
    Informational = "Informational"
    Debug = "Debug"

class LogSource:
    Backend = "Backend"
    Classifier = "Classifier"
    Preprocessor = "Preprocessor"



class Logger:

    def __init__(self):
        self.__url = "http://localhost:8000/backend/logging"
        self.__headers = {
            'Content-Type': 'application/json'
        }


    def newLog(self,type,source,message):
        payload = json.dumps({
            "type": type,
            "source": source,
            "message": message
        })
        response = requests.request("POST", self.__url, headers=self.__headers, data=payload)
        if response.status_code == 200:
            return True
        else:
            return False



if __name__ == '__main__':
    myDatalogger = Logger()
    print(myDatalogger.newLog(LogType.Error,LogSource.Backend,"New User"))
