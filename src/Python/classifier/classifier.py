import json
from re import I
import threading
import flask 
from flask import request
import DBInteraction 
from DataHandler import DataHandler
from ScoreClassifierV1 import ScoreClassifierV1
from ScoreClassifierV15 import ScoreClassifierV15
from Logger import Logger
from Logger import LogSource
from Logger import LogType


app = flask.Flask(__name__)

def classification(str):
    print("Classifying:", str)
    predScore = scoreClassifier.classify(str)
    predCat = categoryClassifier.classify(str)
    return [[predScore,1,predCat,1,"Review", 1]]

def Classifying_thread(id):
    classificationResult = classification(DBInteraction.getSentenceById(id))
    print(classificationResult)
    for classifiaction in classificationResult:
        DBInteraction.addNewClassification(classifiaction,id)

@app.route('/')
def index():
    logger.newLog(LogType.Informational,LogSource.Classifier ,f"{str(request.url)}\n{str(request.headers)}")
    id = flask.request.args.get("id")
    print("id form Preproc",id)
    asyncClassifying = threading.Thread(target=Classifying_thread, args=(id,))
    asyncClassifying.start()
    return "Classifying"

@app.route('/classify',methods = ['POST'])
def classify():
    logger.newLog(LogType.Informational,LogSource.Classifier ,f"{str(request.url)}\n{str(request.headers)}")
    data = request.get_json(silent=False)
    full_response = {}
    for i,sen in enumerate(data):
        print(sen)
        response = classification(sen)
        full_response[str(i)] = {
            "Sentence": sen,
                "Classifications": {
                    "1":{
                        "Score": response[0][0],
                        "ScoreConfidence": response[0][1],
                        "Classification": response[0][2],
                        "ClassificationConfidence": response[0][3],
                        "ContentType": response[0][4],
                        "ContentTypeConfidence": response[0][5]
                        }
                }
        }    
    ret = flask.Response(json.dumps(full_response))
    ret.headers['Content-Type'] = 'application/json'
    return ret

if __name__ == '__main__':
    localDataHandler = DataHandler()
    logger = Logger()

    dataScore = localDataHandler.getScoreData()
    dataKat = localDataHandler.getCategorieData("Location") 

    scoreClassifier = ScoreClassifierV15(dataScore)
    categoryClassifier = ScoreClassifierV1(dataKat)

    app.run(host='0.0.0.0', port=5001)