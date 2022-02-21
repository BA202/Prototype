SET GLOBAL local_infile = true;

LOAD DATA LOCAL INFILE '/Users/tobiasrothlin/Documents/BachelorArbeit/Prototype/CSV_Data/RawReviews.csv'
INTO TABLE RawReviews
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n'
(review,setType,source,language);

LOAD DATA LOCAL INFILE '/Users/tobiasrothlin/Documents/BachelorArbeit/Prototype/CSV_Data/ReviewSentences.csv'
INTO TABLE ReviewSentences
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n'
(sentence,originalReviewId);

LOAD DATA LOCAL INFILE '/Users/tobiasrothlin/Documents/BachelorArbeit/Prototype/CSV_Data/ClassificationResult.csv'
INTO TABLE ClassificationResult
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n'
(score,socreConfidence,classification,classificationConfidence,contentType,contentTypeConfidence,reviewSentenceId);

