const { pool } = require('../config/config');

let reviews = [];

const getReviewsByProductId = async (productId) => {
  try {
    const result = await pool.query('SELECT * FROM reviews WHERE product_id = $1', [productId]);
    return result.rows;
  } catch (error) {
    throw new Error(`Error getting reviews by product ID: ${error.message}`);
  }
};

// Fungsi untuk menambahkan ulasan baru
exports.addReview = (newReview) => {
  reviews.push(newReview);
};

module.exports = {getReviewsByProductId};