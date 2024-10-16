const express= require('express')
const db= require('./databaseConfig.js')
const cors=require('cors')
const productRoute= require('./routes/productRoute.js')
const bannerRoute= require('./routes/bannerRoute.js')
const userRoute = require('./routes/userRoute.js')
const categoryRoute= require('./routes/categoryRoute.js')
const subcategoryRoute= require('./routes/subCategory.js')
const cartRoute = require('./routes/cartRoute.js')
const paymentRoute= require('./routes/paymentRoute.js')
const orderRoute= require('./routes/orderRoute.js')
const adminRoute= require('./routes/adminRoute.js')
const wishRoute= require('./routes/wishRoute.js')
const path = require('path');



let app = express()
app.use(express.json())
app.use(cors())

app.use('/suchit_uploads', express.static(path.join(__dirname, 'suchit_uploads')));
db.connect((err)=>{
if(err) throw err
else{
    console.log("database connected")
}
})

let productTableQuery=`
CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    productTitle VARCHAR(255)  NULL,
    productName VARCHAR(255) NULL,
    productRating INT NULL,
    productDetail TEXT,
    productCategory VARCHAR(255) NULL,
    productSubCategory VARCHAR(255) NULL,
    productPrice INT NULL, 
    productDiscount INT NULL,
    productCode VARCHAR(255) NULL,
    productSize VARCHAR(255) NULL, 
    productImages TEXT NULL, 
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

`
db.query(productTableQuery, (err, result)=>{
    if(err) throw err
    else{
        console.log("product table created successfull")
    }
})
let orderTableQuery=`
CREATE TABLE IF NOT EXISTS orders (
id INT AUTO_INCREMENT PRIMARY KEY,
  customer_address VARCHAR(255) NOT NULL,
  customer_phone VARCHAR(20) NOT NULL,
  customer_email VARCHAR(100) NOT NULL,
  payment_method VARCHAR(50) NOT NULL,
  product_id INT NOT NULL,
  product_title VARCHAR(255),
  quantity INT NOT NULL,
  product_price DECIMAL(10, 2) NOT NULL,
  product_discount DECIMAL(5, 2),
  total_price DECIMAL(10, 2) NOT NULL,
  productImage TEXT,
  status VARCHAR(255) default 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

`
db.query(orderTableQuery, (err, result)=>{
    if(err) throw err
    else{
        console.log("order table created successfull")
    }
})

let categoryTableQuery=`
CREATE TABLE IF NOT EXISTS category_table(
id INT NOT NULL AUTO_INCREMENT,
categoryName VARCHAR(255) NULL,
categoryDescription VARCHAR(255) NULL,
PRIMARY KEY (id));
`
db.query(categoryTableQuery, (err, result)=>{
    if(err) throw err
    else{
        console.log("category table created successfull")
    }
})
let adminTableQuery=`
CREATE TABLE IF NOT EXISTS admin_table(
id INT NOT NULL AUTO_INCREMENT,
email VARCHAR(255) NULL,
password VARCHAR(255) NULL,
PRIMARY KEY (id));
`
db.query(adminTableQuery, (err, result)=>{
    if(err) throw err
    else{
        console.log("category table created successfull")
    }
})

let subcategoryTableQuery=`
CREATE TABLE IF NOT EXISTS subcategory_table(
id INT NOT NULL AUTO_INCREMENT,
categoryName VARCHAR(255) NULL,
subcategoryName VARCHAR(255) NULL,
subcategoryImage VARCHAR(255) NULL,
PRIMARY KEY (id));
`
db.query(subcategoryTableQuery, (err, result)=>{
    if(err) throw err
    else{
        console.log("subcategory table created successfull")
    }
})

let bannerTableQuery=`
CREATE TABLE IF NOT EXISTS banner_table(
id INT NOT NULL AUTO_INCREMENT,
banner TEXT,
productCategory VARCHAR(255) NULL,
productSubCategory VARCHAR(255) NULL,
PRIMARY KEY (id));
`
db.query(bannerTableQuery, (err, result)=>{
    if(err) throw err
    else{
        console.log("banner table created successfull")
    }
})

let clientTableQuery = `CREATE TABLE if not exists clientlist (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NULL,
    email VARCHAR(255) NULL,
    password VARCHAR(255) NULL,
    PRIMARY KEY (id)
  );`
  
  db.query(clientTableQuery, (err, result) => {
    if (err) throw err;
    else {
      console.log("clientlist table created");
    }
  });
  let popupQuery=`
  CREATE TABLE IF NOT EXISTS popup_table(
  id INT NOT NULL AUTO_INCREMENT,
  heading VARCHAR(255) NULL,
  detail TEXT,
  status VARCHAR(255) default 'on',
  PRIMARY KEY (id));
  `
  db.query(popupQuery, (err, result)=>{
      if(err) throw err
      else{
          console.log("popup_table table created successfull")
      }
  })

app.use('/suchit',productRoute)
app.use('/suchit',bannerRoute)
app.use('/suchit',userRoute)
app.use('/suchit',categoryRoute)
app.use('/suchit',subcategoryRoute)
app.use('/suchit',cartRoute)
app.use('/suchit', paymentRoute)
app.use('/suchit', orderRoute)
app.use('/suchit', adminRoute)
app.use('/suchit', wishRoute)

app.listen(4222,()=>{
    console.log(`server is running on ${process.env.PORT}`)
})