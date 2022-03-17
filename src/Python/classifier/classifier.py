from re import I
import threading
import flask 
import DBInteraction 
from DataHandler import DataHandler
from ScoreClassifierV1 import ScoreClassifierV1
from ScoreClassifierV15 import ScoreClassifierV15


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
    id = flask.request.args.get("id")
    print("id form Preproc",id)
    asyncClassifying = threading.Thread(target=Classifying_thread, args=(id,))
    asyncClassifying.start()
    return "Classifying"

if __name__ == '__main__':
    localDataHandler = DataHandler()

    dataScore = localDataHandler.getScoreData()
    dataKat = localDataHandler.getCategorieData("Location") 

    scoreClassifier = ScoreClassifierV15(dataScore)
    categoryClassifier = ScoreClassifierV1(dataKat)

    app.run(host='0.0.0.0', port=5001)