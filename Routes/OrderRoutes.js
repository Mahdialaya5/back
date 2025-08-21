const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/OrderController');
const Auth = require('../MiddleWares/IsAuth');

router.post('/', Auth.Auth, OrderController.placeOrder);
router.get('/', Auth.Auth, OrderController.getMyOrders);

module.exports = router;
