CREATE DATABASE IF NOT EXISTS exam_db;
USE exam_db;

CREATE TABLE Customer (
    ID VARCHAR(10) PRIMARY KEY,
    Name VARCHAR(100),
    Email VARCHAR(100),
    CountryCode VARCHAR(10),
    Budget INT,
    Used INT
);

INSERT INTO Customer VALUES
('C001','Will Peter','will.p@hotmail.com','TH',1000000,600000),
('C002','John Smith','john.smith@hotmail.com','EN',2000000,800000),
('C003','Jame Born','jame.born@hotmail.com','US',3000000,600000),
('C004','Charlie Angel','charlie.angel@hotmail.com','US',4000000,1000000),
('C005','Mickey Brown','mickey.b@hotmail.com','JP',5000000,1000000);

CREATE TABLE `Order` (
    ID VARCHAR(10) PRIMARY KEY,
    Date DATE,
    CustomerID VARCHAR(10),
    Amount INT,
    FOREIGN KEY (CustomerID) REFERENCES Customer(ID)
);

INSERT INTO `Order` VALUES
('O001','2019-10-08','C002',50000),
('O002','2019-10-08','C002',45000),
('O003','2019-11-20','C003',50000),
('O004','2019-05-20','C004',40000);

SELECT * FROM Customer WHERE Used > 500000;