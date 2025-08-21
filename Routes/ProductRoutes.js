const express = require('express')
const router =  express.Router();
const ProductController=require('../controllers/ProductControllers')
const Middleware=require('../MiddleWares/IsAuth')
const upload=require('../utils/multer')
const IsAdmin=require('../MiddleWares/IsAdmin')

router.post('/',Middleware.Auth,IsAdmin,upload("products").single("file"),ProductController.AddProduct)
router.get('/',ProductController.GetProducts)





module.exports = router;


