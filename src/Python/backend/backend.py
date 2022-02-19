import flask
from flask import request
import DBInteraction
import requests

app = flask.Flask(__name__)

url = "http://preprocessor:5002/?id="

@app.route('/getRawReviews')
def getRawReviews():
    ret = flask.Response(DBInteraction.getRawReviews())
    ret.headers['Content-Type'] = 'application/json'
    return ret

@app.route('/getReviewsAsSentances')
def getReviewsAsSentances():
    ret = flask.Response(DBInteraction.getReviewsAsSentances())
    ret.headers['Content-Type'] = 'application/json'
    return ret

@app.route('/getAllClassifiedResults')
def getAllClassifiedResults():
    ret = flask.Response(DBInteraction.getAllClassifiedResults())
    ret.headers['Content-Type'] = 'application/json'
    return ret

@app.route('/getAllData')
def getAllData():
    ret = flask.Response(DBInteraction.getAllData())
    ret.headers['Content-Type'] = 'application/json'
    return ret

@app.route('/addNewReview',methods = ['POST'])
def addNewReview():
    data = request.get_json(silent=False)
    print(data)
    id =  DBInteraction.addNewReview(data['review'],data['setType'],data['source'],data['language'])[0][0]
    response = requests.request("GET", url+str(id))
    print(response.text)
    return getRawReviews() 

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5003)