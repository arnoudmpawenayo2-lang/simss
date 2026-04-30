CREATE DATABASE SIMS;
USE SIMS;

CREATE TABLE Spare_Part (
    SparePartID INT PRIMARY KEY AUTO_INCREMENT,
    Name VARCHAR(100),
    Category VARCHAR(100),
    Quantity INT,
    UnitPrice DECIMAL(10,2),
    TotalPrice DECIMAL(10,2)
);

CREATE TABLE Stock_In (
    StockInID INT PRIMARY KEY AUTO_INCREMENT,
    SparePartID INT,
    StockInQuantity INT,
    StockInDate DATE,
    FOREIGN KEY (SparePartID) REFERENCES Spare_Part(SparePartID)
);

CREATE TABLE Stock_Out (
    StockOutID INT PRIMARY KEY AUTO_INCREMENT,
    SparePartID INT,
    StockOutQuantity INT,
    StockOutUnitPrice DECIMAL(10,2),
    StockOutTotalPrice DECIMAL(10,2),
    StockOutDate DATE,
    FOREIGN KEY (SparePartID) REFERENCES Spare_Part(SparePartID)
);

CREATE TABLE Users (
    UserID INT PRIMARY KEY AUTO_INCREMENT,
    Username VARCHAR(50) UNIQUE,
    Password VARCHAR(255)
);