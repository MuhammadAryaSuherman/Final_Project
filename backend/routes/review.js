const express = require('express');
const router = express.Router();
const reviewController = require('../controller/review');

router.get('/reviews/:id', reviewController.getReviewsByProductId);

router.post('/reviews', reviewController.addReview);

module.exports = router;
