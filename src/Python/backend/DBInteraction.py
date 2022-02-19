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

def getRawReviews():
    return json.dumps(sqlQuery("SELECT review FROM HotelReviews.RawReviews"))

def getReviewsAsSentances():
    return json.dumps(sqlQuery("SELECT sentence FROM HotelReviews.ReviewSentences;"))

def getAllClassifiedResults():
    return json.dumps(sqlQuery("""
        select ClassificationResult.score,ClassificationResult.classification,ClassificationResult.contentType, ReviewSentences.sentence, RawReviews.review
        from ClassificationResult
        inner join ReviewSentences on ClassificationResult.reviewSentenceId = ReviewSentences.id
        inner join RawReviews on ReviewSentences.originalReviewId = RawReviews.id;
        """))


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

def getAllData():
    return """[
    [
      "Der Pool war sehr schön. Das znacht war fein.",
      [
        [
          "Der Pool was sehr schön.",
          [
            [
              0.8,
              0.3,
              "Pool",
              0.6,
              "Review",
              0.5
            ]
          ]
        ],
        [
          " Das znacht war fein.",
          [
            [
              0.8,
              0.99,
              "Essen",
              0.54,
              "Review",
              0.34
            ],
            [
              0.8,
              0.23,
              "Essen",
              0.45,
              "Story",
              0.01
            ]
          ]
        ]
      ]
    ]
  ]"""