const db= require('../databaseConfig.js')
const path = require('path');

exports.productSave=(req,res)=>{
    let productTitle = req.body.productTitle
    let productName = req.body.productName
    let productRating= req.body.productRating
    let productDetail= req.body.productDetail
    let productCategory= req.body.productCategory
    let productSubCategory= req.body.productSubCategory
    let productPrice= req.body.productPrice
    let productDiscount= req.body.productDiscount
    let productCode= req.body.productCode
    let productSize= req.body.productSize  
    const productImage = req.files.map(file => file.filename);
    // console.log(imagePaths)
    let value=[[productTitle,productName,productRating,productDetail,productCategory,productSubCategory,productPrice,productDiscount,productCode,productSize, JSON.stringify(productImage)]]
    let sql=`insert into products(productTitle,productName,productRating,productDetail,productCategory,productSubCategory,productPrice,productDiscount,productCode,productSize,productImages) values ?`
    db.query(sql,[value],(err,result)=>{
        if(err) throw err
        else{
            res.send("product us details submitted")
        }
    })
}



exports.getProduct = (req, res)=>{
    let sql = 'select * from products'
    db.query(sql, (err, result)=>{
        if(err) throw err
        else{
            res.json(result)
        }
    })
}
exports.getProductById = (req, res)=>{
    let id = req.params.id
    let sql = 'select * from products where id = ?'
    db.query(sql,[id], (err, result)=>{
        if(err) throw err
        else{
            res.json(result)
        }
    })
}
exports.getProductByCode = (req, res)=>{
    let code = req.params.code
    let sql = 'select * from products where productCode = ?'
    db.query(sql,[code], (err, result)=>{
        if(err) throw err
        else{
            res.json(result)
        }
    })
}

exports.deleteProduct = (req, res)=>{
    let id = req.params.id
    let sql = 'delete from products where id = ?'

    db.query(sql, [id], (err, result)=>{
        if(err) throw err
        else{
            res.send(' product data deleted')
        }
    })
}


exports.productUpdate = (req, res) => {
    // Extract product details from request body
    const { id } = req.params; // Assuming product ID is passed in the URL
    const {
        productTitle,
        productName,
        productRating,
        productDetail,
        productCategory,
        productSubCategory,
        productPrice,
        productDiscount,
        productCode,
        productSize
    } = req.body;

    // Check if files are uploaded
    const productImages = req.files ? req.files.map(file => file.filename) : [];
    const images = productImages.length > 0 ? JSON.stringify(productImages) : null;

    // Build the SQL query with only the fields provided
    let updates = [];
    let values = [];

    if (productTitle) {
        updates.push('productTitle = ?');
        values.push(productTitle);
    }
    if (productName) {
        updates.push('productName = ?');
        values.push(productName);
    }
    if (productRating) {
        updates.push('productRating = ?');
        values.push(productRating);
    }
    if (productDetail) {
        updates.push('productDetail = ?');
        values.push(productDetail);
    }
    if (productCategory) {
        updates.push('productCategory = ?');
        values.push(productCategory);
    }
    if (productSubCategory) {
        updates.push('productSubCategory = ?');
        values.push(productSubCategory);
    }
    if (productPrice) {
        updates.push('productPrice = ?');
        values.push(productPrice);
    }
    if (productDiscount) {
        updates.push('productDiscount = ?');
        values.push(productDiscount);
    }
    if (productCode) {
        updates.push('productCode = ?');
        values.push(productCode);
    }
    if (productSize) {
        updates.push('productSize = ?');
        values.push(productSize);
    }
    if (images) {
        updates.push('productImages = ?');
        values.push(images);
    }

    if (updates.length === 0) {
        return res.status(400).send("No fields to update");
    }

    // Add the WHERE clause
    const sql = `UPDATE products SET ${updates.join(', ')} WHERE id = ?`;
    values.push(id);

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Error updating product");
        } else {
            console.log("object")
            res.send("Product details updated successfully");
        }
    });
};
