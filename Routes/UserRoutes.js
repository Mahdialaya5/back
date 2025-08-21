const express = require('express')
const router =  express.Router();
const userController=require('../controllers/Usercontrollers')
const Middleware=require('../MiddleWares/IsAuth')
const IsAdmin=require('../MiddleWares/IsAdmin')


router.post('/register',userController.RegisterUser)

//Auth
router.post('/login',userController.Login)
router.get('/currentuser',Middleware.Auth,userController.GetCurrent)

router.put('/:id',Middleware.Auth,userController.Update)


// Admin =>
router.get('/',Middleware.Auth,IsAdmin,userController.Getusers)

module.exports = router;