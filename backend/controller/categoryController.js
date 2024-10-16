const db= require('../databaseConfig.js')

exports.categorySave=(req,res)=>{
    let categoryName = req.body.categoryName
    let categoryDescription = req.body.categoryDetails
   
   

    let value=[[categoryName,categoryDescription]]
    let sql=`insert into category_table(categoryName,categoryDescription) values ?`
    db.query(sql,[value],(err,result)=>{
        if(err) throw err
        else{
            res.send("category details submitted")
        }
    })
}

exports.categoryGet=(req,res)=>{
    let sql=`select * from category_table`
    db.query(sql,(err,result)=>{
        if(err) throw err
        else{
            res.json(result)
        }
    })
}
// exports.categoryUpdate=(req,res)=>{
//     let id = req.params.id
//     let newData= req.body
//     let sql=`update category_table set ? where id = ?`
//     db.query(sql,[newData, id],(err,result)=>{
//         if(err) throw err
//         else{
//             res.json("data updaetd")
//         }
//     })
// }
exports.categoryDelete=(req,res)=>{
    let id = req.params.id
    let sql=`delete from category_table where id = ?`
    db.query(sql,[id],(err,result)=>{
        if(err) throw err
        else{
            res.json("data deleted")
        }
    })
}

