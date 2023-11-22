const express = require('express');
const router = express.Router();
const reviewController = require('../controller/review');

router.get('/produk/:id/reviews', reviewController.getReviewsByProductId);
router.post('/reviews', reviewController.addReview);
router.put('/produk/:id/reviews/:reviewId', reviewController.updateReview);
router.delete('/produk/:id/reviews/:reviewId', reviewController.deleteReview);

module.exports = router;