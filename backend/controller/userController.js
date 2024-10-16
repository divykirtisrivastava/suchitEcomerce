
let db  = require('../databaseConfig.js')
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

 function generateToken(user) {
    return  jwt.sign({id: user.id}, "hii", {expiresIn: '1d'})
}

exports.clientSave = async (req, res)=>{

    let name = req.body.name
    let email = req.body.email
    let password = req.body.password
    let hash = await bcrypt.hash(password, 10)

    let value = [[name,email, hash]]

    let sql  = 'insert into clientlist(name,email, password) values ?'

    db.query(sql, [value], (err, result)=>{
        if(err) throw err
        else{
            res.send("clientlist saved")
        }
    })
}

exports.clientLogin = (req, res)=>{
    let email = req.body.email
    let password = req.body.password
    db.query('select * from clientlist where email = ?', [email], async (err, result)=>{
        if(err) throw err
        else{
          if(result.length> 0){
            await  bcrypt.compare(password, result[0].password, async (err, isMatch)=>{
                if(err) throw err
                else{
                    if(isMatch){
                        let token = await generateToken(result[0])
                        let tname = result[0].email.split('@')[0]
                        createUserWishListtable(tname)
                        createUserCartListtable(tname)
                        res.json({token, tname, isMatch, result})
                    }
                    else{
                        res.json({isMatch})
                    }
                }
            })
          }else{
            res.json({isMach:false})
          }
        }
    })
}

function createUserWishListtable(tname){
    let userwishlistTableQuery = `CREATE TABLE IF NOT EXISTS \`${tname}_suchit_wish\` (
    id INT NOT NULL AUTO_INCREMENT,
    productTitle VARCHAR(255) NULL,
    productName VARCHAR(255) NULL,
    productRating INT NULL,
    productDetail TEXT NULL,
    productCategory VARCHAR(255) NULL,
    productSubCategory VARCHAR(255) NULL,
    productPrice INT NULL, 
    productDiscount INT NULL,
    productCode VARCHAR(255) NULL,
    productSize VARCHAR(255) NULL, 
    productImages TEXT NULL, 
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id)  -- Add this line to make the id the primary key
);`
      
      db.query(userwishlistTableQuery, (err, result) => {
        if (err) throw err;
        else {
          console.log("userwishlist table created");
        }
      });
}
function createUserCartListtable(tname){
    let userwishlistTableQuery = `CREATE TABLE IF NOT EXISTS \`${tname}_suchit_cart\` (
    id INT NOT NULL AUTO_INCREMENT,
    productTitle VARCHAR(255) NULL,
    productName VARCHAR(255) NULL,
    productRating INT NULL,
    productDetail TEXT NULL,
    productCategory VARCHAR(255) NULL,
    productSubCategory VARCHAR(255) NULL,
    productPrice INT NULL, 
    productDiscount INT NULL,
    productCode VARCHAR(255) NULL,
    productSize VARCHAR(255) NULL, 
    productImages TEXT NULL, 
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id)  -- Add this line to make the id the primary key
);`
      
      db.query(userwishlistTableQuery, (err, result) => {
        if (err) throw err;
        else {
          console.log("userwishlist table created");
        }
      });
}

exports.verify =async (req, res)=>{
    let token = req.headers['authorization'].split(" ")[1]
    // console.log("client token:- "+token)
    if(token){
      await  jwt.verify(token, "hii", (err, decode)=>{
            if(err) throw err
            else{
                db.query("select * from clientlist where id = ?", [decode.id], (err, result)=>{
                    if(err) throw err
                    else{
                        res.json(result[0])
                    }
                })
            }
        })
    }else{
        res.send("token not get")
    }
}

exports.usersGet=(req,res)=>{
    let sql=`select * from clientlist`
    db.query(sql,(err,result)=>{
        if(err) throw err
        else{
            res.json(result)
        }
    })
}
