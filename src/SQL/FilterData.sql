SELECT 
	RR.id as RRID,
	RR.review,
    RR.creationDate,
    RR.setType,
    RR.source,
    RR.language,
    RS.id as RSID,
    RS.sentence,
    RS.modDate,
    CR.id as CRID,
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
WHERE 
	DATE(RR.creationDate) BETWEEN '2013-04-05' AND '2022-05-05' 
    AND (CR.classification = "Location" OR CR.classification = "Location")
	AND CR.score = "Positive"
    AND CR.contentType = "Review"
	AND RR.language = "English"
    AND RR.source = "Online"

order by RR.id, RS.id;