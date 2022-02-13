DELETE FROM `ClassificationResult` ;
DELETE FROM `ReviewSentences` ;
DELETE FROM `RawReviews` ;

INSERT INTO `RawReviews` 
	(`review`, 						 	`setType`, 	`source`, 	`language`) VALUES 
	('Ich bin in den Pool gefallen.',  	'Training', 'Online', 	'Deutsch'),
    ('Ich bin in den Pool gefallen.', 	'Training', 'Online', 	'Deutsch');


INSERT INTO `HotelReviews`.`ReviewSentences` (`sentence`, `originalReviewId`) VALUES ('Der Pool war gut.', '1');

INSERT INTO `HotelReviews`.`ClassificationResult` (`score`, `socreConfidence`, `classification`, `classificationConfidence`, `contentType`, `contentTypeConfidence`,`reviewSentenceId`) VALUES ('0.6', '1', 'Pool', '1', 'Review', '1',1);
