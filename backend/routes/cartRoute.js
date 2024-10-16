const express=require('express')
const router=express.Router()
const cartController = require('../controller/cartController.js')
const uploads=require('../multerConfig.js')

router.post('/cartSave/:user',cartController.cartSave)
router.get('/getCart/:user', cartController.getCart)
router.delete('/deleteCart/:id/:user', cartController.deleteCart)
router.get('/viewPopup',cartController.viewpopup)
router.put('/updatePopup/:id', cartController.updatepopup)
router.post('/savePopup', cartController.savepopup)
module.exports=router