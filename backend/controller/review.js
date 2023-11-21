const ReviewModel = require('../models/review');

const ReviewController = {
  async getReviewsByProductId(req, res) {
    const productId = req.params.id;
    try {
      const reviews = await ReviewModel.getReviewsByProductId(productId);
      res.json(reviews);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async addReview(req, res) {
    const { review } = req.body;

    if (!review) {
      return res.status(400).json({ error: 'Harap lengkapi semua bidang ulasan.' });
    }

    try {
      const newReview = await ReviewModel.addReviewByProductId(review, req);
      res.status(201).json({ message: 'Ulasan berhasil ditambahkan.', review: newReview });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async updateReview(req, res) {
    const reviewId = req.params.reviewId;
    const newReview = req.body.review;

    try {
      const updatedReview = await ReviewModel.updateReviewById(reviewId, newReview);

      if (!updatedReview) {
        return res.status(404).json({ error: 'Ulasan tidak ditemukan.' });
      }

      res.json({ message: 'Ulasan berhasil diperbarui.', review: updatedReview });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async updateReview(req, res) {
    const reviewId = req.params.reviewId;
    const newReview = req.body.review;

    try {
      const updatedReview = await ReviewModel.updateReviewById(reviewId, newReview);

      if (!updatedReview) {
        return res.status(404).json({ error: 'Ulasan tidak ditemukan.' });
      }

      res.json({ message: 'Ulasan berhasil diperbarui.', review: updatedReview });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async deleteReview(req, res) {
    const reviewId = req.params.reviewId;

    try {
      const deletedReview = await ReviewModel.deleteReviewById(reviewId);

      if (!deletedReview) {
        return res.status(404).json({ error: 'Ulasan tidak ditemukan.' });
      }

      res.json({ message: 'Ulasan berhasil dihapus.', review: deletedReview });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = ReviewController;