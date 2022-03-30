from re import sub
import flask
from flask import request
import DBInteraction
import requests
import json
from Logger import Logger
from Logger import LogSource
from Logger import LogType


app = flask.Flask(__name__)

url = "http://preprocessor:5002"

def newLog(type,source,message):
    DBInteraction.addNewLog(type,source,message)

@app.route('/getRawReviews')
def getRawReviews():
    newLog(LogType.Informational,LogSource.Backend ,f"{str(request.url)}\n{str(request.headers)}")
    ret = flask.Response(DBInteraction.getRawReviews())
    ret.headers['Content-Type'] = 'application/json'
    return ret

@app.route('/getReviewsAsSentances')
def getReviewsAsSentances():
    newLog(LogType.Informational,LogSource.Backend ,f"{str(request.url)}\n{str(request.headers)}")
    ret = flask.Response(DBInteraction.getReviewsAsSentances())
    ret.headers['Content-Type'] = 'application/json'
    return ret

@app.route('/getAllClassifiedResults')
def getAllClassifiedResults():
    newLog(LogType.Informational,LogSource.Backend ,f"{str(request.url)}\n{str(request.headers)}")
    ret = flask.Response(DBInteraction.getAllClassifiedResults())
    ret.headers['Content-Type'] = 'application/json'
    return ret

@app.route('/getAllData')
def getAllData():
    newLog(LogType.Informational,LogSource.Backend ,f"{str(request.url)}\n{str(request.headers)}")
    ret = flask.Response(DBInteraction.getAllData())
    ret.headers['Content-Type'] = 'application/json'
    return ret

@app.route('/getAllTraningData')
def getAllTraningData():
    newLog(LogType.Informational,LogSource.Backend ,f"{str(request.url)}\n{str(request.headers)}")
    ret = flask.Response(DBInteraction.getAllTrainingData())
    ret.headers['Content-Type'] = 'application/json'
    return ret

@app.route('/getAllUserInputData')
def getAllUserInputData():
    newLog(LogType.Informational,LogSource.Backend ,f"{str(request.url)}\n{str(request.headers)}")
    ret = flask.Response(DBInteraction.getAllUserInputData())
    ret.headers['Content-Type'] = 'application/json'
    return ret

@app.route('/getReviewExamples')
def getReviewExamples():
    newLog(LogType.Informational,LogSource.Backend ,f"{str(request.url)}\n{str(request.headers)}")
    ret = flask.Response(DBInteraction.getReviewExamples())
    ret.headers['Content-Type'] = 'application/json'
    return ret

@app.route('/addNewReview',methods = ['POST'])
def addNewReview():
    newLog(LogType.Informational,LogSource.Backend ,f"{str(request.url)}\n{str(request.headers)}")
    data = request.get_json(silent=False)
    print(data)
    id =  DBInteraction.addNewReview(data['review'],data['setType'],data['source'],data['language'])[0][0]
    response = requests.request("GET", url+"/?id="+str(id))
    print(response.text)
    return getRawReviews() 

@app.route('/addClassifiedReview',methods = ['POST'])
def addClassifiedReview():
    newLog(LogType.Informational,LogSource.Backend ,f"{str(request.url)}\n{str(request.headers)}")
    data = request.get_json(silent=False)
    print(data)
    DBInteraction.deleteExampleReview(data["exampleID"])
    reviewId = DBInteraction.addNewReview(data["data"]["Reviews"]["1"]["RawReview"],"UserClassified","Online","English")[0][0]
    print(reviewId)
    for key in data["data"]["Reviews"]["1"]["Sentences"].keys():
        senId = DBInteraction.addNewsentence(data["data"]["Reviews"]["1"]["Sentences"][key]["Sentence"],reviewId)[0][0]
        for subkey in data["data"]["Reviews"]["1"]["Sentences"][key]["Classifications"].keys():
            dict = data["data"]["Reviews"]["1"]["Sentences"][key]["Classifications"][subkey]
            DBInteraction.addNewClassification([dict[key] for key in dict.keys()],senId)
    ret = flask.Response("Added")
    ret.headers['Content-Type'] = 'text/html; charset=UTF-8'
    return ret

@app.route('/classifyReview',methods = ['POST'])
def classifyReview():
    newLog(LogType.Informational,LogSource.Backend ,f"{str(request.url)}\n{str(request.headers)}")
    data = request.get_json(silent=False)
    payload = json.dumps(data)
    headers = {'Content-Type': 'application/json'}
    dataFromPreprocessor = json.loads(requests.request("POST", url+"/preprocess", headers=headers, data=payload).text)
    respone = {
    "data": {
        "Reviews": {
            "1": {
                "RawReview": data["review"],
                "Sentences": dataFromPreprocessor
                }
            }
        }
    }
    ret = flask.Response(json.dumps(respone))
    ret.headers['Content-Type'] = 'application/json'
    return ret

@app.route('/logging',methods = ['POST'])
def logging():
    newLog(LogType.Informational,LogSource.Backend ,f"{str(request.url)}\n{str(request.headers)}")
    data = request.get_json(silent=False)
    print(data)
    DBInteraction.addNewLog(data['type'],data['source'],data['message'])
    ret = flask.Response('{"Done"}')
    ret.headers['Content-Type'] = 'application/json'
    return ret

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5003)