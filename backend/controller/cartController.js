const db= require('../databaseConfig.js')

exports.cartSave=(req,res)=>{
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

exports.getCart = (req, res)=>{
    let user = req.params.user
    let sql = `select * from ${user}`
    db.query(sql, (err, result)=>{
        if(err) throw err
        else{
            res.json(result)
        }
    })
}

exports.deleteCart = (req, res)=>{
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


exports.viewpopup = (req,res)=>{
    let sql = "select * from popup_table"
    db.query(sql,(err, result)=>{
        if(err) throw err
        else{
            res.json(result)
        }
    })
}

exports.updatepopup = (req, res)=>{
    let id = req.params.id
    let newData = req.body
    let sql = 'update popup_table set  ? where id = 1'
    db.query(sql, [newData, id], (err, result)=>{
        if(err) throw err
        else{
            res.send('cart data updated')
        }
    })
}
exports.savepopup = (req, res)=>{
    let heading = req.body.heading
    let detail = req.body.detail
    let value = [[heading, detail]]
    let sql = 'insert into popup_table(heading, detail) values ?'
    db.query(sql, [value], (err, result)=>{
        if(err) throw err
        else{
            res.send('popup data saved')
        }
    })
}


