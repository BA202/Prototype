DROP SCHEMA IF EXISTS HotelReviews;
CREATE SCHEMA HotelReviews;
USE HotelReviews;

DROP TABLE IF EXISTS `RawReviews`;
CREATE TABLE `RawReviews`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `review` VARCHAR(2500) NOT NULL,
    `setType` VARCHAR(50) NOT NULL,
    `source` VARCHAR(50) NOT NULL,
    `language` VARCHAR(50) NOT NULL,
    `hotel` VARCHAR(50) NOT NULL DEFAULT 'None',
    PRIMARY KEY (id),
    `creationDate` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `modDate` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


DROP TABLE IF EXISTS `ReviewSentences`;
CREATE TABLE `ReviewSentences`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `sentence` VARCHAR(500) NOT NULL,
    `originalReviewId` INT UNSIGNED NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT `fk_RawRef` FOREIGN KEY(originalReviewId) REFERENCES RawReviews (id),
    `modDate` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


DROP TABLE IF EXISTS `ClassificationResult`;
CREATE TABLE `ClassificationResult`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `score` VARCHAR(50) NULL,
    `socreConfidence` DOUBLE NULL,
    `classification` VARCHAR(50) NULL,
    `classificationConfidence` DOUBLE NULL,
    `contentType` VARCHAR(50) NULL,
    `contentTypeConfidence` DOUBLE NULL,
    `reviewSentenceId` INT UNSIGNED NOT NULL,
    PRIMARY KEY (id),
	CONSTRAINT `fk_SenRef` FOREIGN KEY(reviewSentenceId) REFERENCES ReviewSentences (id)
);

DROP TABLE IF EXISTS `ExampleReviews`;
CREATE TABLE `ExampleReviews`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `review` VARCHAR(2500) NOT NULL,
    `creationDate` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `modDate` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);

DROP TABLE IF EXISTS `Logs`;
CREATE TABLE `Logs`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `message` VARCHAR(1000) NOT NULL,
    `source` VARCHAR(50) NULL,
    `type` VARCHAR(50) NULL,
    `creationDate` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);



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

drop view if exists UnloadedDataEnglish;
create view UnloadedDataEnglish as 
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
where RR.language = 'English'
order by RR.id, RS.id ;

drop view if exists UnloadedDataGerman;
create view UnloadedDataGerman as 
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
where RR.language = 'German'
order by RR.id, RS.id ;


drop view if exists UnloadedTrainingData;
create view UnloadedTrainingData as 
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
where RR.setType = 'Training'
order by RR.id, RS.id ;

drop view if exists UnloadedTrainingDataGerman;
create view UnloadedTrainingDataGerman as 
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
where RR.setType = 'Training' and RR.language = 'German'
order by RR.id, RS.id ;

drop view if exists UnloadedTrainingDataEnglish;
create view UnloadedTrainingDataEnglish as 
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
where RR.setType = 'Training' and RR.language = 'English'
order by RR.id, RS.id ;

drop view if exists UnloadedUserInputData;
create view UnloadedUserInputData as 
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
where RR.setType = 'UserInput'
order by RR.id, RS.id ;



