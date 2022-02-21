drop view if exists UnloadedData;
create view UnloadedData as 
select
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
order by RR.id, RS.id ;
