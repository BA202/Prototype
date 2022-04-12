import mysql.connector
import json


def sqlQuery(query_str):
    cnx = mysql.connector.connect(user='root', password='root',
                          host='db',
                          database='HotelReviews')
    cursor = cnx.cursor()
    query = (query_str)
    cursor.execute(query)
    res = cursor.fetchall()
    cnx.close()
    return res

def sqlDelete(query_str):
    cnx = mysql.connector.connect(user='root', password='root',
                          host='db',
                          database='HotelReviews')
    cursor = cnx.cursor()
    query = (query_str)
    cursor.execute(query)
    cnx.commit()
    cnx.close()

def sqlSet(query_str):
    cnx = mysql.connector.connect(user='root', password='root',
                          host='db',
                          database='HotelReviews')
    cursor = cnx.cursor()
    query = (query_str)
    cursor.execute(query)
    cnx.commit()
    cursor.execute(" SELECT LAST_INSERT_ID();")
    res = cursor.fetchall()
    cnx.close()
    return res

def deleteExampleReview(id):
    sqlDelete(f"DELETE FROM HotelReviews.ExampleReviews WHERE (id = {id});")

def getRawReviews():
    return json.dumps(sqlQuery("SELECT review FROM HotelReviews.RawReviews"))

def getReviewExamples():
    return json.dumps(sqlQuery("SELECT id,review FROM HotelReviews.ExampleReviews;"))

def getReviewsAsSentances():
    return json.dumps(sqlQuery("SELECT sentence FROM HotelReviews.ReviewSentences;"))

def getAllClassifiedResults():
    return json.dumps(sqlQuery("""
        select ClassificationResult.score,ClassificationResult.classification,ClassificationResult.contentType, ReviewSentences.sentence, RawReviews.review
        from ClassificationResult
        inner join ReviewSentences on ClassificationResult.reviewSentenceId = ReviewSentences.id
        inner join RawReviews on ReviewSentences.originalReviewId = RawReviews.id;
        """))
def addNewLog(type,source,message):
    return sqlSet(f"INSERT INTO `HotelReviews`. `Logs`(`type`, `source`, `message`) VALUES('{type}', '{source}', '{message}');")

def addNewReview(review,setType,source,language):
    return sqlSet(f"INSERT INTO `HotelReviews`. `RawReviews`(`review`, `setType`, `source`, `language`) VALUES('{review}', '{setType}', '{source}', '{language}');")

def getReviewById(id):
    return sqlQuery(f"SELECT review FROM HotelReviews.RawReviews WHERE ID IN ({id});")[0][0]

def getSentenceById(id):
    return sqlQuery(f"SELECT sentence FROM HotelReviews.ReviewSentences WHERE ID IN ({id});")[0][0]

def addNewsentence(sentence,originalReviewId):
    return sqlSet(f"INSERT INTO `HotelReviews`. `ReviewSentences`(`sentence`, `originalReviewId`) VALUES('{sentence}', '{originalReviewId}');")

def addNewClassification(classificationResult, reviewSentenceId):
    return sqlSet(f"INSERT INTO `HotelReviews`. `ClassificationResult`(`score`, `socreConfidence`, `classification`, `classificationConfidence`, `contentType`, `contentTypeConfidence`, `reviewSentenceId`) VALUES('{classificationResult[0]}', '{classificationResult[1]}', '{classificationResult[2]}', '{classificationResult[3]}', '{classificationResult[4]}', '{classificationResult[5]}', '{reviewSentenceId}');")


def createClassifiactionTemplate(score,scoreConfidence,classification,classificationConfidence,contentType,ContentTypeConfidence):
    return {
                              "Score": score,
                              "ScoreConfidence": scoreConfidence,
                              "Classification": classification,
                              "ClassificationConfidence": classificationConfidence,
                              "ContentType": contentType,
                              "ContentTypeConfidence": ContentTypeConfidence
                          }

def createSentenceTemplate(sentence, modDate):
    return {
                      "Sentence": sentence,
                      "ModDate": str(modDate),
                      "Classifications" : {}
                  }

def createReviewTemplate(rawReview,creationTime,setType,source,language):
    return {
        "RawReview": rawReview,
        "CreationTime": str(creationTime),
        "SetType": setType,
        "Source": source,
        "Language": language,
        "Sentences": {}
    }


def getAllData(lan = ""):
    if lan == "English":
        res = sqlQuery(f"SELECT * FROM UnloadedDataEnglish;")
    elif lan == "German":
        res = sqlQuery(f"SELECT * FROM UnloadedDataGerman;")
    else:
        res = sqlQuery(f"SELECT * FROM UnloadedData;")
    return toJson(res)

def getAllTrainingData(lan = ""):
    if lan == "English":
        res = sqlQuery(f"SELECT * FROM UnloadedTrainingDataEnglish;")
    elif lan == "German":
        res = sqlQuery(f"SELECT * FROM UnloadedTrainingDataGerman;")
    else:
        res = sqlQuery(f"SELECT * FROM UnloadedTrainingData;")
    return toJson(res)

def getAllUserInputData():
    res = sqlQuery(f"SELECT * FROM UnloadedUserInputData;")
    return toJson(res)


def toJson(res):
    dataFrame = {
        "data":{
            "Reviews":{}
        },
            "meta":{}
    }
    for line in res:
        if not line[0] in dataFrame["data"]["Reviews"].keys():
            dataFrame["data"]["Reviews"][line[0]] = createReviewTemplate(line[1],line[2],line[3],line[4],line[5])
            dataFrame["data"]["Reviews"][line[0]]["Sentences"][line[6]] = createSentenceTemplate(line[7],line[8])
            dataFrame["data"]["Reviews"][line[0]]["Sentences"][line[6]]["Classifications"][line[9]] = createClassifiactionTemplate(line[10],line[11], line[12],line[13], line[14],line[15])
        else:
            if not line[6] in dataFrame["data"]["Reviews"][line[0]]["Sentences"].keys():
                dataFrame["data"]["Reviews"][line[0]]["Sentences"][line[6]] = createSentenceTemplate(line[7], line[8])
                dataFrame["data"]["Reviews"][line[0]]["Sentences"][line[6]]["Classifications"][line[9]] = createClassifiactionTemplate(line[10], line[11], line[12], line[13], line[14], line[15])
            else:
                dataFrame["data"]["Reviews"][line[0]]["Sentences"][line[6]]["Classifications"][line[9]] = createClassifiactionTemplate(line[10], line[11], line[12], line[13], line[14], line[15])
    return json.dumps(dataFrame)