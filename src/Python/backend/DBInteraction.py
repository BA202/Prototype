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
    return sqlQuery("SELECT review FROM HotelReviews.RawReviews WHERE ID IN ({id});")