const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Endpoint untuk mencari produk berdasarkan ID
router.get('/products/:id', productController.getProductsById);

// Endpoint untuk mendapatkan semua produk
router.get('/products', productController.getProducts);

module.exports = router;
