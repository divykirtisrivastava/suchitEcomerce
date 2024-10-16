const express=require('express')
const router=express.Router()
const subcategoryController = require('../controller/subCategory.js')
const uploads=require('../multerConfig.js')

router.post('/subcategorysave',uploads.single('subcategoryImage'),subcategoryController.subcategorySave)
router.get('/subcategoryget',subcategoryController.subcategoryGet)
// router.put('/shop/categoryupdate',categoryController.categoryUpdate)
router.delete('/subcategorydelete/:id',subcategoryController.subcategoryDelete)
module.exports=router