const ReviewModel = require('../models/review');

const ReviewController = {
  async getReviewsByProductId(req, res) {
    const productId = req.params.product_id;
    try {
      const reviews = await ReviewModel.getReviewsByProductId(productId);
      res.json(reviews);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async addReview(req, res) {
    const { productId, review } = req.body;

    // Validasi input
    if (!productId || !review) {
      return res.status(400).json({ error: 'Harap lengkapi semua bidang ulasan.' });
    }

    try {
      // Tambahkan ulasan baru menggunakan ReviewModel
      const newReview = await ReviewModel.addReviewByProductId(productId, review);
      
      res.status(201).json({ message: 'Ulasan berhasil ditambahkan.', review: newReview });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = ReviewController;
