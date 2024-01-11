CREATE USER 'tester'@'%' IDENTIFIED BY 'TestpassW0rk';
GRANT Alter ON *.* TO 'tester'@'%';
GRANT Create ON *.* TO 'tester'@'%';
GRANT Create view ON *.* TO 'tester'@'%';
GRANT Delete ON *.* TO 'tester'@'%';
GRANT Delete history ON *.* TO 'tester'@'%';
GRANT Drop ON *.* TO 'tester'@'%';
GRANT Grant option ON *.* TO 'tester'@'%';
GRANT Index ON *.* TO 'tester'@'%';
GRANT Insert ON *.* TO 'tester'@'%';
GRANT References ON *.* TO 'tester'@'%';
GRANT Select ON *.* TO 'tester'@'%';
GRANT Show view ON *.* TO 'tester'@'%';
GRANT Trigger ON *.* TO 'tester'@'%';
GRANT Update ON *.* TO 'tester'@'%';

CREATE DATABASE `skylinera` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;

-- skylinera.config definition

CREATE TABLE `config` (
  `uid` bigint(20) NOT NULL AUTO_INCREMENT,
  `configName` varchar(100) DEFAULT NULL,
  `configCode` varchar(100) NOT NULL,
  `configVal` text DEFAULT NULL,
  `sid` varchar(100) NOT NULL,
  `createdDate` datetime NOT NULL,
  `createdBy` varchar(100) NOT NULL,
  `modifiedDate` datetime DEFAULT NULL,
  `modifiedby` varchar(100) DEFAULT NULL,
  `deleted` bit(1) DEFAULT NULL,
  `id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`uid`)
);

