const express=require('express')
const router=express.Router()
const categoryController = require('../controller/categoryController.js')
const uploads=require('../multerConfig.js')

router.post('/categorysave',categoryController.categorySave)
router.get('/categoryget',categoryController.categoryGet)
// router.put('/shop/categoryupdate',categoryController.categoryUpdate)
router.delete('/categorydelete/:id',categoryController.categoryDelete)
module.exports=router