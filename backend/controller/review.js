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
}
// Simpan data ulasan sementara
let reviews = [];

// Menambahkan ulasan baru
exports.addReview = (req, res) => {
  const { productId, username, rating, comment } = req.body;

  // Validasi input
  if (!productId || !username || !rating || !comment) {
    return res.status(400).json({ error: 'Harap lengkapi semua bidang ulasan.' });
  }

  // Simpan ulasan baru
  const newReview = {
    productId,
    username,
    rating,
    comment,
    timestamp: new Date().toISOString(),
  };

  reviews.push(newReview);

  res.status(201).json({ message: 'Ulasan berhasil ditambahkan.', review: newReview });
};

module.exports = ReviewController;