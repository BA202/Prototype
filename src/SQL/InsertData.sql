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


create view UnloadedData as 
select
	RR.review,
    RR.creationDate,
    RR.setType,
    RR.source,
    RR.modDate,
    RS.sentence,
	CR.score,
    CR.socreConfidence,
    CR.classification,
    CR.classificationConfidence,
    CR.contentType,
    CR.contentTypeConfidence

from 
	ClassificationResult as CR
inner join ReviewSentences as RS on RS.id = CR.reviewSentenceId
inner join RawReviews as RR on RR.id = RS.originalReviewId
order by RR.id ;