create view UnloadedData as 
select
	RR.review,
    RS.sentence,
	CR.score,
    CR.socreConfidence,
    CR.reviewSentenceId
    
    
from 
	ClassificationResult as CR
inner join ReviewSentences as RS on RS.id = CR.reviewSentenceId
inner join RawReviews as RR on RR.id = RS.originalReviewId
order by RR.id ;

select * from UnloadedData