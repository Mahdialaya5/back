const express = require('express');
const router = express.Router();
const CartController = require('../controllers/CartController');
const Auth = require('../MiddleWares/IsAuth');

router.post('/', Auth.Auth, CartController.addToCart);
router.get('/', Auth.Auth, CartController.getCart);
router.delete('/', Auth.Auth, CartController.clearCart);

module.exports = router;
