import json
from re import I
import threading
import flask 
from flask import request
import DBInteraction 
from DataHandler import DataHandler
from SentimentAnalysisPipeline import SentimentAnalysisPipeline
from Logger import Logger
from Logger import LogSource
from Logger import LogType
from SupportVectorMachine import SupportVectorMachine


app = flask.Flask(__name__)



def classification(str,lan):
    print("Classifying:", str)
    if lan == None:
        raise ValueError
    predScore, confidence = scoreClassifier.classify(str)
    if lan == "English":
        predCat, CatConf = categoryClassifierEng.classify(str)
    else:
        predCat, CatConf = categoryClassifierDe.classify(str)

    return [[predScore,round(confidence, 4),predCat,round(CatConf, 4),"Review", 1]]

def Classifying_thread(id,lan):
    print(lan)
    classificationResult = classification(DBInteraction.getSentenceById(id),lan)
    print(classificationResult)
    for classifiaction in classificationResult:
        DBInteraction.addNewClassification(classifiaction,id)

@app.route('/')
def index():
    logger.newLog(LogType.Informational,LogSource.Classifier ,f"{str(request.url)}\n{str(request.headers)}")
    id = flask.request.args.get("id")
    lan = flask.request.args.get("lan")
    print("id form Preproc",id)
    asyncClassifying = threading.Thread(target=Classifying_thread, args=(id,lan,))
    asyncClassifying.start()
    return "Classifying"

@app.route('/classify',methods = ['POST'])
def classify():
    logger.newLog(LogType.Informational,LogSource.Classifier ,f"{str(request.url)}\n{str(request.headers)}")
    data = request.get_json(silent=False)
    lan = data['lan']
    data = data['listOfTextes']
    full_response = {}
    for i,sen in enumerate(data):
        print(sen)
        response = classification(sen,lan)
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
    logger = Logger()

    scoreClassifier = SentimentAnalysisPipeline()
    categoryClassifierEng = SupportVectorMachine("English","")
    categoryClassifierDe = SupportVectorMachine("German","")

    app.run(host='0.0.0.0', port=5001)