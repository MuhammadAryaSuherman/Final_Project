const express = require('express');
const router = express.Router();
const ReviewController = require('../controller/review');

router.get('/reviews', ReviewController.getReviews);

module.exports = router;