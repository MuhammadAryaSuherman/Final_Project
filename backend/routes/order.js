const express = require('express');
const router = express.Router();
const OrderController = require('../controller/order');

router.post('/order', OrderController.createOrder);

module.exports = router;
