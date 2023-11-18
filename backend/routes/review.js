// reviewRoutes.js
const express = require('express');
const router = express.Router();
const reviewController = require('../controller/review');

// Endpoint untuk mendapatkan semua ulasan
router.get('/produk/:id/reviews', reviewController.getReviewsByProductId);

// Endpoint untuk menambahkan ulasan baru
router.post('/reviews', reviewController.addReview);

module.exports = router;
