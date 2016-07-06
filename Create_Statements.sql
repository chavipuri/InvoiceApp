CREATE DATABASE IF NOT EXISTS STEEL;

USE STEEL;

CREATE TABLE `INVOICE` (
  `INVOICE_ID` int(10) NOT NULL AUTO_INCREMENT,
  `CUSTOMER_NAME` varchar(45) NOT NULL,
  `INVOICE_NO` varchar(45) NOT NULL,
  `DATE` date NOT NULL,
  `TOTAL_AMT` decimal(12,2) NOT NULL,
  PRIMARY KEY (`INVOICE_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=87 DEFAULT CHARSET=utf8;

CREATE TABLE `INVOICE_DETAILS` (
  `INVOICE_ID` int(10) NOT NULL AUTO_INCREMENT,
  `PRODUCT_NAME` varchar(45) NOT NULL,
  `QUANTITY` int(10) NOT NULL,
  `PRICE` decimal(12,2) NOT NULL,
  `AMOUNT` decimal(12,2) NOT NULL,
  KEY `fk_INVOICE` (`INVOICE_ID`),
  CONSTRAINT `fk_INVOICE` FOREIGN KEY (`INVOICE_ID`) REFERENCES `INVOICE` (`INVOICE_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=87 DEFAULT CHARSET=utf8;


