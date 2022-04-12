import json
from socket import IP_DEFAULT_MULTICAST_LOOP
import threading
import flask 
import DBInteraction
import requests
from flask import request
import preprocessorImplementationV1
from Logger import Logger
from Logger import LogSource
from Logger import LogType

url = "http://classifier:5001"

app = flask.Flask(__name__)


def preprocerssor(str):
    str = preprocessorImplementationV1.cleanUp(str)
    res = preprocessorImplementationV1.splitInToParts(str)
    return res

def preprocess_thread(id,lan):
    cleanText = preprocerssor(DBInteraction.getReviewById(id))
    print(cleanText)
    for sen in cleanText:
        senID = DBInteraction.addNewsentence(sen,id)[0][0]
        response = requests.request("GET", url + "/?id=" +str(senID)+f"&lan='{lan}'")
        print(response.text)


@app.route('/')
def index():
    logger.newLog(LogType.Informational,LogSource.Classifier ,f"{str(request.url)}\n{str(request.headers)}")
    id = flask.request.args.get("id")
    lan = flask.request.args.get("lan")
    asyncPreprocess = threading.Thread(target=preprocess_thread, args=(id,lan,))
    asyncPreprocess.start()
    return "Preprocessing"



@app.route('/preprocess',methods = ['POST'])
def preprocess():
    logger.newLog(LogType.Informational,LogSource.Classifier ,f"{str(request.url)}\n{str(request.headers)}")
    data = request.get_json(silent=False)
    review = data['review']
    cleanText = preprocerssor(review)
    payload = json.dumps({
        "listOfTextes":cleanText,
        "lan": data['lan']
    })
    headers = {'Content-Type': 'application/json'}
    
    ret = flask.Response(requests.request("POST", url+"/classify", headers=headers, data=payload))
    ret.headers['Content-Type'] = 'application/json'
    return ret

if __name__ == '__main__':
    logger = Logger()
    app.run(host='0.0.0.0', port=5002)
    
