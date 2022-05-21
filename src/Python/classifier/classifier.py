import json
from re import I
import threading
import flask 
from flask import request
import DBInteraction 
from DataHandler import DataHandler
from PipelineInterface import PipelineInterface
from Logger import Logger
from Logger import LogSource
from Logger import LogType
from SupportVectorMachine import SupportVectorMachine


app = flask.Flask(__name__)



def classification(str,lan):
    print("Classifying:", str)
    print("Lan",lan)
    if lan == None:
        raise ValueError
    if lan == "English":
        res = classificationEnglish.classify(str)
        predScore, confidence = scoreClassifierEnglish.classify(str)
    else:
        print("German Classification")
        res = classificationGerman.classify(str)
        predScore, confidence = scoreClassifierGerman.classify(str)

    return [[predScore,round(confidence, 4),sample[0],sample[1],"Review", 1] for sample in res]

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
    print("ClassifierInput:",lan)
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
        res = {}
        for m,el in enumerate(response):
            res[str(m+1)] = { 
            "Score": el[0],
            "ScoreConfidence": el[1],
            "Classification": el[2],
            "ClassificationConfidence": el[3],
            "ContentType": el[4],
            "ContentTypeConfidence": el[5]
            }

        full_response[str(i)] = {
            "Sentence": sen,
                "Classifications": res
        }    
    ret = flask.Response(json.dumps(full_response))
    ret.headers['Content-Type'] = 'application/json'
    return ret

if __name__ == '__main__':
    logger = Logger()
    scoreClassifierGerman = PipelineInterface("Tobias/bert-base-german-cased_German_Hotel_sentiment",isMultiLabel=False)
    scoreClassifierEnglish = PipelineInterface("Tobias/bert-base-uncased_English_Hotel_sentiment",isMultiLabel=False)
    classificationGerman = PipelineInterface("Tobias/bert-base-uncased_German_MultiLable_classification",isMultiLabel=True)
    classificationEnglish = PipelineInterface("Tobias/bert-base-uncased_English_MultiLable_classification",isMultiLabel=True)

    app.run(host='0.0.0.0', port=5001)