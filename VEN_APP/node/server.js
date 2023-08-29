const express = require('express');
const app = express();
const bodyParser= require('body-parser');
const port = 3000;
const cors = require('cors');
app.use(bodyParser.json());
app.use(cors());
const sql=require('mssql');
const config = {
    server:'vendor-product.database.windows.net',
    port: 1433,
    user: 'sanjayvs',
    password: 'Sanjay@098',
    database: "Vendor_Product_Database",
    options: {
      encrypt: true, // If using Azure SQL Database, set to true
      trustServerCertificate: false // Change to true for development/testing purposes
    }
  };
/*
app.post('/data', async(req, res) => {
    const { username, password } = req.body;
    console.log(username,password);
  try {
    const pool = await sql.connect(config);
    const result = await pool.request().query('SELECT * FROM Vendor');
    res.json(result.recordset);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});
*/

let vendorid;
let vendorname;
let vendorzip;
let vendorgender;
let vendorstate;
app.post('/data', async(req, res) => {
    
    username=req.body.username;
    password=req.body.password;
    console.log(username,password);
    try {
      const pool = await sql.connect(config);
      const result = await pool
        .request()
        .input('Vendor_ID', sql.VarChar, username)
        .input('Vendor_Password', sql.VarChar, password)
        .query('SELECT * FROM Vendor WHERE  Vendor_ID= @Vendor_ID AND Vendor_Password = @Vendor_Password');
        
      if (result.recordset.length === 1) {
        res.json({ success: true, message: 'Logged in successfully' });
        vendorid=username;
      } else {
        res.send({ success: false, message: 'Invalid email or password' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Server Error' });
    }
});

app.post('/product', async(req, res) => {
    
  productname=req.body.productname;

  console.log(productname);
  try {

    const pool = await sql.connect(config);
    const result = await pool
      .request()
      .input('Product_Name', sql.VarChar, productname)
      .query('SELECT * FROM Product WHERE  Product_Name= @Product_name');
      
    if (result.recordset.length === 1) {
      console.log(result.recordset[0]["Product_Name"]);
      res.send({ status: true, data: result.recordset });
    } else {
      res.status(401).json({ success: false, message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

app.post('/order', async(req, res) => {
    
 date=req.body.date;

  console.log(date);
  try {

    const pool = await sql.connect(config);
    const result = await pool
      .request()
      .input('date', sql.VarChar, date)
      .input('Vendor_ID', sql.VarChar, vendorid)
      .query('SELECT * FROM OrderDetail WHERE  Date_of_order= @date and Vendor_ID=@Vendor_ID');
      
    if (result.recordset.length >=1) {
      console.log(result.recordset);
      res.send({ success: true, data: result.recordset });
    } else {
      res.send({ success: false});
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});


app.post('/addproduct', async(req, res) => {
    
  sellingprice=req.body.sellingprice;
  productdescription=req.body.productdescription;
  productname=req.body.productname;
  productcategory=req.body.productcategory;
  wholesaleprice=req.body.wholesaleprice;
   
   try {
    
     const pool = await sql.connect(config);
     /*
     
       */
/*
       */
      
       const result1 = await pool
       .request()
       .input('wholesaleprice', sql.Int, wholesaleprice)
       .input('sellingprice', sql.Int, sellingprice)
       .input('productdescription', sql.VarChar, productdescription)
       .input('productname', sql.VarChar, productname)
       .input('productcategory', sql.VarChar, productcategory)
       .input('Vendor_ID', sql.VarChar, vendorid)
       .query('INSERT INTO Product VALUES (@productname, @productdescription, @productcategory)');

       const result = await pool
       .request()
       .input('productname', sql.VarChar, productname)
       .input('Vendor_ID', sql.VarChar, vendorid)
       .query('INSERT INTO  Product_Vendor VALUES(@productname,@Vendor_ID)');

       const result2 = await pool
       .request()
       .input('wholesaleprice', sql.Int, wholesaleprice)
       .input('sellingprice', sql.Int, sellingprice)
       .input('productname', sql.VarChar, productname)
       .input('Vendor_ID', sql.VarChar, vendorid)
       .query('INSERT INTO  SellingPrice_WholesalePrice VALUES(@productname,@Vendor_ID,@sellingprice,@wholesaleprice)');
       
      
       res.send({ status: true });
    
   } catch (error) {
     console.error(error);
     res.status(500).json({ success: false, message: 'Server Error' });
   }
 });

 app.post('/signup', async(req, res) => {
    
  
  vendorid1=req.body.vendorid;
  vendorname1=req.body.vendorname;
  vendor_password1=req.body.vendor_password;
  
  vendor_gender1=req.body.vendor_gender;
  statename1=req.body.statename;
  zipcode1=req.body.zipcode;
   console.log(zipcode1,statename1,vendor_gender1,vendor_password1,vendorname1,vendorid1);
   try {
    
     const pool = await sql.connect(config);


     const result4 = await pool
        .request()
        .input('vendorid1', sql.VarChar, vendorid1)
        .query('SELECT * FROM Vendor WHERE Vendor_ID=@vendorid1');
        if (result4.recordset.length === 1) {
         res.send({message:"Vendor ID Already in use",success:false});
        } 
        else {
      
       const result1 = await pool
       
       .request()
       .input('vendorname', sql.VarChar, vendorname1)
       .input('vendergender', sql.VarChar, vendor_gender1)
       .query('INSERT INTO  Gender VALUES(@vendorname,@vendergender)');


      const result3 = await pool
        .request()
        .input('vendorzip', sql.Int, zipcode1)
        .query('SELECT * FROM VendorAddress WHERE Vendor_Zipcode=@vendorzip');
        
      if (result3.recordset.length === 1) {
        
      } else {
        const result2 = await pool
        .request()
        .input('vendorzip', sql.Int, zipcode1)
        .input('vendorstate', sql.VarChar, statename1)
        .query('INSERT INTO  VendorAddress VALUES(@vendorzip,@vendorstate)');
      }

      

       const result = await pool
       .request()
       .input('vendorzip', sql.Int, zipcode1)
       .input('vendorname', sql.VarChar, vendorname1)
       .input('vendorpassword', sql.VarChar, vendor_password1)
       .input('vendorid', sql.VarChar, vendorid1)
       .query('INSERT INTO Vendor VALUES (@vendorid, @vendorpassword, @vendorname,@vendorzip)');

      

       
       
      
       res.send({ success: true });
    }
    
   } catch (error) {
     console.error(error);
     res.status(500).json({ success: false, message: 'Server Error' });
   }
 });

app.post('/addorder', async(req, res) => {
    
  date=req.body.date;
  transactionid=req.body.transactionid;
  productname=req.body.productname;
   
   try {
 
     const pool = await sql.connect(config);
     const result = await pool
       .request()
       .input('date', sql.VarChar, date)
       .input('transactionid', sql.VarChar, transactionid)
       .input('productname', sql.VarChar, productname)
       .input('Vendor_ID', sql.VarChar, vendorid)
       .query('INSERT INTO  OrderDetail VALUES(@transactionid,@productname,@Vendor_ID,@date)');
       
       console.log(result.recordset);
       res.send({ status: true });
    
   } catch (error) {
     console.error(error);
     res.status(500).json({ success: false, message: 'Server Error' });
   }
 });

app.get('/details', async(req, res) => {
  
  
  console.log("in details");
  console.log(vendorid);
  try {
    const pool = await sql.connect(config);
    const result = await pool
      .request()
      .input('Vendor_ID', sql.VarChar, vendorid)
      .query('SELECT Vendor_Name, Vendor_Zipcode FROM Vendor WHERE Vendor_ID = @Vendor_ID');

      vendorname=result.recordset[0]["Vendor_Name"];
      vendorzip=result.recordset[0]["Vendor_Zipcode"];

      const result1 = await pool
      .request()
      .input('Vendor_Name', sql.VarChar, vendorname)
      .query('SELECT Vendor_Gender FROM Gender WHERE Vendor_Name = @Vendor_Name');

      vendorgender=result1.recordset[0]["Vendor_Gender"];
      console.log(vendorid,vendorname,vendorzip,vendorgender);

      const result2 = await pool
      .request()
      .input('Vendor_Zipcode', sql.Int, vendorzip)
      .query('SELECT Vendor_State FROM VendorAddress WHERE Vendor_Zipcode = @Vendor_Zipcode');
      vendorstate=result2.recordset[0]["Vendor_State"];
     
        const vdata=[vendorname,vendorgender,vendorzip,vendorstate]
        res.send({ status: true, data: vdata});
        


  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});


app.post('/profit', async(req, res) => {
  
  date=req.body.date;
  try {
    const pool = await sql.connect(config);
    const result = await pool
      .request()
      .input('Vendor_ID', sql.VarChar, vendorid)
      .input('date', sql.VarChar, date)
      .query('SELECT SUM(Selling_Price - Wholesale_Price) AS Total_Price FROM OrderDetail JOIN SellingPrice_WholesalePrice ON SellingPrice_WholesalePrice.Product_Name = OrderDetail.Product_Name AND SellingPrice_WholesalePrice.Vendor_ID = OrderDetail.Vendor_ID WHERE Date_of_order LIKE @date AND OrderDetail.Vendor_ID LIKE @Vendor_ID');
     
        const vdata=result.recordset[0]["Total_Price"];
        console.log(result);
        res.send({ status: true, data: vdata});
        
        


  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});


// Define routes and middleware here



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
