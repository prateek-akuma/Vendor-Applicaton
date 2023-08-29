CREATE TABLE VendorAddress(
Vendor_Zipcode int PRIMARY KEY,
Vendor_State varchar(30));

INSERT INTO VendorAddress (Vendor_Zipcode,Vendor_State)
 VALUES
       (98402,'Telangana'),
	   (98403,'Telangana'),
	   (98404,'Telangana'),
	   (98405,'Telangana'),
	   (504208,'Punjab'),
	   (504503,'Punjab');

CREATE TABLE Vendor(
Vendor_ID varchar(30),
Vendor_Password varchar(30),
Vendor_Name varchar(30) REFERENCES Gender(Vendor_Name),
Vendor_Zipcode int REFERENCES VendorAddress(Vendor_Zipcode));

INSERT INTO Vendor (Vendor_ID,Vendor_Password,Vendor_Name,Vendor_Zipcode)
 VALUES 
       ('sanjay123','Sanjay123','sanjay',98402),
	   ('nirav123','Nirav123','nirav',98403),
	   ('prateek123','Prateek123','prateek',98404),
	   ('prathyush123','Prathyush123','prathyush',98405),
	   ('srikar123','Srikar123','srikar',98402),
	   ('nanda123','Nanda123','nanda',98402),
	   ('rahul123','Rahul123','rahul',504208),
	   ('virat123','Virat123','virat',504208),
	   ('dhoni123','Dhoni123','dhoni',504503),
	   ('kalpitha123','Kalpitha123','kalpitha',98402),
	   ('sathwika123','Sathwika123','sathwika',98402),
	   ('soumya123','Soumy123','soumya',98403),
	   ('vyshnavi123','Vyshnavi123','vyshnavi',504503),
	   ('alluarjun123','Alluarjun123','alluarjun',98402),
	   ('sravanthi123','Sravanthi123','sravanthi',98405),
	   ('nandini123','Nandini123','nandini',98405),
	   ('sanjay456','Sanjay456','sanjay',98405);

CREATE TABLE Gender(
Vendor_Name varchar(30) PRIMARY KEY,
Vendor_Gender varchar(6));

INSERT INTO Gender(Vendor_Name,Vendor_Gender)
VALUES 
    ('sanjay','male'),
	('nirav','male'),
	('prateek','male'),
	('prathyush','male'),
	('srikar','male'),
	('nanda','male'),
	('rahul','male'),
	('virat','male'),
	('dhoni','male'),
	('kalpitha','female'),
	('sathwika','female'),
	('soumya','female'),
	('vyshnavi','female'),
	('nandini','female'),
	('alluarjun','female'),
	('sravanthi','female');

CREATE TABLE Product(
Product_Name varchar(30) PRIMARY KEY,
Product_Description varchar(100),
Product_Category varchar(100) );
INSERT INTO Product(Product_Name,Product_Description,Product_Category) 
VALUES
      ('iphone14','smartPhone manufactured by Apple and released in 2020','smart phone'),
	  ('iphone13','smartphone manufactured by Apple and released in 2019','smart phone'),
	  ('iphone12','smartphone manufactured by Apple and released in 2018','smart phone'),
	  ('iphone11','smartphone manufactured by Apple and released in 2017','smart phone'),
	  ('macbook pro', 'powerful laptop by Apple with a sleek design', 'laptop'),
      ('dell xps 15', 'high-performance laptop with a stunning display', 'laptop'),
      ('hp spectre x360', 'convertible laptop with excellent battery life', 'laptop'),
       ('lenovo thinkpad', 'durable and lightweight business laptop', 'laptop'),
       ('lg Y2', '55-inch OLED TV with stunning picture quality', 'TV'),
       ('samsung M2', '65-inch QLED TV with vibrant colors and HDR support', 'TV'),
       ('sony X7', '65-inch OLED TV with exceptional contrast and smart features', 'TV');

CREATE TABLE Product_Vendor (
    Product_Name VARCHAR(30) REFERENCES Product(Product_Name),
    Vendor_ID VARCHAR(30) REFERENCES Vendor(Vendor_ID),
    PRIMARY KEY (Product_Name, Vendor_ID)
);
 INSERT INTO Product_Vendor(Product_Name,Vendor_ID)
  VALUES ('iphone11','sanjay123'),
         ('iphone12','sanjay123'),
		 ('dell xps 15','nirav123'),
		 ('lg Y2','prateek123');
CREATE TABLE SellingPrice_WholesalePrice (
    Product_Name VARCHAR(30),
    Vendor_ID VARCHAR(30),
    PRIMARY KEY (Product_Name, Vendor_ID),
    Selling_Price FLOAT,
    Wholesale_Price FLOAT,
    FOREIGN KEY (Product_Name, Vendor_ID) REFERENCES Product_Vendor (Product_Name, Vendor_ID)
);

INSERT INTO SellingPrice_WholesalePrice(Product_Name,Vendor_ID,Selling_Price,Wholesale_Price)
VALUES ('dell xps 15','nirav123',1200.0,899.0),
       ('iphone11','sanjay123',899.0,699.0),
	   ('iphone12','sanjay123',999.0,899.0),
	   ('lg Y2','prateek123',233.0,120.0);