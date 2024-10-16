const express=require('express')
const router=express.Router()
const bannerController = require('../controller/bannerController.js')
const uploads=require('../multerConfig.js')


router.post('/bannerSave',uploads.single('banner'),bannerController.bannerSave)
router.get('/getbanner', bannerController.getBanner)
router.get('/getbanner/:id', bannerController.getBannerById)
router.delete('/deletebanner/:id', bannerController.deletebanner)
router.put('/updatebanner/:id',uploads.single('banner'), bannerController.bannerUpdate)

module.exports=router