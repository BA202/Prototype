import threading
import flask 
import DBInteraction

app = flask.Flask(__name__)

def classification(str):
    print("Classifying:", str)
    return [[0.5,1,"Pool",1,"Review", 1]]

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
    app.run(host='0.0.0.0', port=5001)