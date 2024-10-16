const express=require('express')
const router=express.Router()
const productController = require('../controller/productController.js')
const uploads=require('../multerConfig.js')

router.post('/productSave',uploads.array('productImages', 4),productController.productSave)
router.get('/getProduct', productController.getProduct)
router.get('/getProduct/:id', productController.getProductById)
router.get('/getProductByCode/:code', productController.getProductByCode)
router.delete('/deleteProduct/:id', productController.deleteProduct)
router.put('/updateProduct/:id',uploads.array('productImages', 4), productController.productUpdate)

module.exports=router