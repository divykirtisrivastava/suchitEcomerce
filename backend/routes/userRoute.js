const express=require('express')
const router=express.Router()
const userController = require('../controller/userController.js')


router.post('/userSave',userController.clientSave)
router.post('/userlogin', userController.clientLogin)
router.post('/userverify', userController.verify)
router.get('/userGet', userController.usersGet)


module.exports=router