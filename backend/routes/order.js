const express = require('express');
const router = express.Router();
const OrderController = require('../controller/order');

router.post('/order', OrderController.createOrder);
router.get('/order/user/:user_id', OrderController.getOrdersByUserId);

module.exports = router;
