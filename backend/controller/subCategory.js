const db= require('../databaseConfig.js')
const path = require('path');

exports.subcategorySave=(req,res)=>{
    let categoryName= req.body.categoryName
    let subcategoryName= req.body.subcategoryName
    let subcategoryImage = req.file.filename;
    let value=[[categoryName,subcategoryName,subcategoryImage]]
    let sql=`insert into subcategory_table(categoryName,subcategoryName,subcategoryImage) values ?`
    db.query(sql,[value],(err,result)=>{
        if(err) throw err
        else{
            res.send("banner us details submitted")
        }
    })
}



exports.subcategoryGet = (req, res)=>{
    let sql = 'select * from subcategory_table'
    db.query(sql, (err, result)=>{
        if(err) throw err
        else{
            res.json(result)
        }
    })
}
exports.getBannerById = (req, res)=>{
    let id = req.params.id
    let sql = 'select * from subcategory_table where id = ?'
    db.query(sql,[id], (err, result)=>{
        if(err) throw err
        else{
            res.json(result)
        }
    })
}

exports.subcategoryDelete = (req, res)=>{
    let id = req.params.id
    let sql = 'delete from subcategory_table where id = ?'

    db.query(sql, [id], (err, result)=>{
        if(err) throw err
        else{
            res.send(' banner_table data deleted')
        }
    })
}


// exports.bannerUpdate = (req, res) => {
//     // Extract product details from request body
//     const { id } = req.params; // Assuming product ID is passed in the URL
//     const {
//         productCategory,
//         productSubCategory,
//     } = req.body;

//     // Check if files are uploaded
//     const banner = req.file.filename;

//     // Build the SQL query with only the fields provided
//     let updates = [];
//     let values = [];

//     if (productCategory) {
//         updates.push('productCategory = ?');
//         values.push(productCategory);
//     }
//     if (productSubCategory) {
//         updates.push('productSubCategory = ?');
//         values.push(productSubCategory);
//     }
  
//     if (banner) {
//         updates.push('banner = ?');
//         values.push(banner);
//     }

//     if (updates.length === 0) {
//         return res.status(400).send("No fields to update");
//     }

//     // Add the WHERE clause
//     const sql = `UPDATE banner_table SET ${updates.join(', ')} WHERE id = ?`;
//     values.push(id);

//     db.query(sql, values, (err, result) => {
//         if (err) {
//             console.error(err);
//             return res.status(500).send("Error updating product");
//         } else {
//             // console.log("object")
//             res.send("banner_table details updated successfully");
//         }
//     });
// };
