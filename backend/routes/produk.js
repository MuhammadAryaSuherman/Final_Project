const express = require('express');
const router = express.Router();
const productController = require('../controller/produk');
const path = require('path')

router.get('/produk/:id', productController.getProductById);
router.get('/produk', productController.getProducts);

router.post('/produk', productController.addProduct);

module.exports = router;

