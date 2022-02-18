import flask
from flask import request
import DBInteraction


app = flask.Flask(__name__)

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

@app.route('/addNewReview',methods = ['POST'])
def addNewReview():
    data = request.get_json(silent=False)
    print(data)
    print(DBInteraction.addNewReview(data['review'],data['setType'],data['source'],data['language']))
    return getRawReviews() 

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5003)