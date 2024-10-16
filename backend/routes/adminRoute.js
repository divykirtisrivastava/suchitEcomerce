const express=require('express')
const router=express.Router()
const adminController = require('../controller/adminControllet.js')


router.post('/adminsave',adminController.adminSave)
router.post('/adminlogin', adminController.adminogin)

module.exports=router