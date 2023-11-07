const Review = require('../models/review');

class ReviewController {
    static async getReviews(req, res) {
        const productId = req.query.product_id;

        try {
            const reviews = await Review.getReviews(productId);
            return res.status(200).json(reviews);
        } catch (error) {
            console.error('Error getting reviews:', error);
            return res.status(500).json({ message: 'Failed to retrieve reviews' });
        }
    }
}

module.exports = ReviewController;