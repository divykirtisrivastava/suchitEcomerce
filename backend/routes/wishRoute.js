const express=require('express')
const router=express.Router()
const wishController = require('../controller/wishlistController.js')
const uploads=require('../multerConfig.js')

router.post('/wishSave/:user',wishController.wishSave)
router.get('/getWish/:user', wishController.getWish)
router.delete('/deleteWish/:id/:user', wishController.deleteWish)
router.get('/viewWish/:id',wishController.viewCart)
router.put('/updateWish/:id', wishController.updateCart)
module.exports=router