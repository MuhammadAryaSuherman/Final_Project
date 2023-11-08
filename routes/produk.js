const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Endpoint untuk mencari produk berdasarkan ID
router.get('/produk/:id', productController.getProductsById);

// Endpoint untuk mendapatkan semua produk
router.get('/produk', productController.getProducts);

module.exports = router;
