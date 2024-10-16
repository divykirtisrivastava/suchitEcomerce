const db= require('../databaseConfig.js')

exports.wishSave=(req,res)=>{
    let user = req.params.user
    const { productTitle, productName, productRating, productDetail, productCategory, productSubCategory, productDiscount, productCode, productPrice, productImages } = req.body;

    // Insert product into the database
    const sql = `INSERT INTO ${user} (productTitle, productName, productRating, productDetail, productCategory, productSubCategory, productPrice, productDiscount, productCode, productImages)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  
    db.query(sql, [productTitle, productName, productRating, productDetail, productCategory, productSubCategory, productPrice, productDiscount, productCode, productImages], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Database insertion error' });
      }
      res.status(200).json({ message: 'Product added successfully', productId: result.insertId });
    });
}

exports.getWish = (req, res)=>{
    let user = req.params.user
    let sql = `select * from ${user}`
    db.query(sql, (err, result)=>{
        if(err) throw err
        else{
            res.json(result)
        }
    })
}

exports.deleteWish = (req, res)=>{
    let id = req.params.id
    let user = req.params.user
    let sql = `delete from ${user} where id = ?`

    db.query(sql, [id], (err, result)=>{
        if(err) throw err
        else{
            res.send('cart data deleted')
        }
    })
}


exports.viewCart = (req,res)=>{
    let id = req.params.id
    let sql = "select * from cart_table where id = ?"
    db.query(sql, [id], (err, result)=>{
        if(err) throw err
        else{
            res.json(result)
        }
    })
}

exports.updateCart = (req, res)=>{
    let id = req.params.id
    let newData = req.body
    let sql = 'update cart_table set  ? where id = ?'
    db.query(sql, [newData, id], (err, result)=>{
        if(err) throw err
        else{
            res.send('cart data updated')
        }
    })
}


