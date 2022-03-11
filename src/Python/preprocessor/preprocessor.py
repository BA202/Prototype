from socket import IP_DEFAULT_MULTICAST_LOOP
import threading
import flask 
import DBInteraction
import requests
import preprocessorImplementationV1

url = "http://classifier:5001/?id="

app = flask.Flask(__name__)


def preprocerssor(str):
    str = preprocessorImplementationV1.cleanUp(str)
    res = preprocessorImplementationV1.splitInToParts(str)
    return res

def preprocess_thread(id):
    cleanText = preprocerssor(DBInteraction.getReviewById(id))
    print(cleanText)
    for sen in cleanText:
        senID = DBInteraction.addNewsentence(sen,id)[0][0]
        response = requests.request("GET", url+str(senID))
        print(response.text)

@app.route('/')
def index():
    id = flask.request.args.get("id")
    asyncPreprocess = threading.Thread(target=preprocess_thread, args=(id,))
    asyncPreprocess.start()
    
    return "Preprocessing"

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5002)