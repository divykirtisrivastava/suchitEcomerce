const express=require('express')
const router=express.Router()
const orderController = require('../controller/OrderController.js')
const uploads=require('../multerConfig.js')

router.post('/createOrder/:tname',orderController.createOrder)
router.get('/getOrder',orderController.ordersGet)
router.get('/getOrderByEmail/:email',orderController.ordersGetEmail)
router.put('/updateOrder/:id',orderController.ordersUpdate)
// router.get('/categoryget',categoryController.categoryGet)
// // router.put('/shop/categoryupdate',categoryController.categoryUpdate)
// router.delete('/categorydelete/:id',categoryController.categoryDelete)
module.exports=router