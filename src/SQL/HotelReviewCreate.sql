DROP SCHEMA IF EXISTS HotelReviews;
CREATE SCHEMA HotelReviews;
USE HotelReviews;

DROP TABLE IF EXISTS `RawReviews`;
CREATE TABLE `RawReviews`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `review` VARCHAR(100) NOT NULL,
    `setType` VARCHAR(50) NOT NULL,
    `source` VARCHAR(50) NOT NULL,
    `language` VARCHAR(50) NOT NULL,
    PRIMARY KEY (id),
    `creationDate` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `modDate` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


DROP TABLE IF EXISTS `ReviewSentences`;
CREATE TABLE `ReviewSentences`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `sentence` VARCHAR(50) NOT NULL,
    `originalReviewId` INT UNSIGNED NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT `fk_RawRef` FOREIGN KEY(originalReviewId) REFERENCES RawReviews (id),
    `modDate` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


DROP TABLE IF EXISTS `ClassificationResult`;
CREATE TABLE `ClassificationResult`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `score` DOUBLE NULL,
    `socreConfidence` DOUBLE NULL,
    `classification` VARCHAR(50) NULL,
    `classificationConfidence` DOUBLE NULL,
    `contentType` VARCHAR(50) NULL,
    `contentTypeConfidence` DOUBLE NULL,
    `reviewSentenceId` INT UNSIGNED NOT NULL,
    PRIMARY KEY (id),
	CONSTRAINT `fk_SenRef` FOREIGN KEY(reviewSentenceId) REFERENCES ReviewSentences (id)
);