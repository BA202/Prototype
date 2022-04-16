SET GLOBAL local_infile = true;


LOAD DATA LOCAL INFILE '/Users/tobiasrothlin/Documents/BachelorArbeit/DataSets/FullClassifiedDataSetV1.2/RawReviews.tsv'
INTO TABLE RawReviews
CHARACTER SET utf8 
FIELDS TERMINATED BY '\t'
LINES TERMINATED BY '\n'
(creationDate,review,setType,source,language);


LOAD DATA LOCAL INFILE '/Users/tobiasrothlin/Documents/BachelorArbeit/DataSets/FullClassifiedDataSetV1.2/ReviewSentences.tsv'
INTO TABLE ReviewSentences
CHARACTER SET utf8 
FIELDS TERMINATED BY '\t'
LINES TERMINATED BY '\n'
(sentence,originalReviewId);


LOAD DATA LOCAL INFILE '/Users/tobiasrothlin/Documents/BachelorArbeit/DataSets/FullClassifiedDataSetV1.2/ClassificationResult.tsv'
INTO TABLE ClassificationResult
CHARACTER SET utf8 
FIELDS TERMINATED BY '\t'
LINES TERMINATED BY '\n'
(score,socreConfidence,classification,classificationConfidence,contentType,contentTypeConfidence,reviewSentenceId);


LOAD DATA LOCAL INFILE '/Users/tobiasrothlin/Documents/BachelorArbeit/DataSets/FullClassifiedDataSetV1.2/ReviewExampels.tsv'
INTO TABLE ExampleReviews
CHARACTER SET utf8 
FIELDS TERMINATED BY '\t'
LINES TERMINATED BY '\n'
(review);