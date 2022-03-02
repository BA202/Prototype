SET GLOBAL local_infile = true;

LOAD DATA LOCAL INFILE '/Users/tobiasrothlin/Documents/BachelorArbeit/DataSets/TobiasClassification/RawReviews.tsv'
INTO TABLE RawReviews
FIELDS TERMINATED BY '\t'
LINES TERMINATED BY '\n'
(review,setType,source,language);

LOAD DATA LOCAL INFILE '/Users/tobiasrothlin/Documents/BachelorArbeit/DataSets/TobiasClassification/ReviewSentences.tsv'
INTO TABLE ReviewSentences
FIELDS TERMINATED BY '\t'
LINES TERMINATED BY '\n'
(sentence,originalReviewId);

LOAD DATA LOCAL INFILE '/Users/tobiasrothlin/Documents/BachelorArbeit/DataSets/TobiasClassification/ClassificationResult.tsv'
INTO TABLE ClassificationResult
FIELDS TERMINATED BY '\t'
LINES TERMINATED BY '\n'
(score,socreConfidence,classification,classificationConfidence,contentType,contentTypeConfidence,reviewSentenceId);

