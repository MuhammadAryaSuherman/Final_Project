const { pool } = require('../config/config');

const getReviewsByProductId = async (productId) => {
  try {
    const result = await pool.query('SELECT * FROM reviews WHERE produk_id = $1', [productId]);
    return result.rows;
  } catch (error) {
    throw new Error(`Error getting reviews by product ID: ${error.message}`);
  }
};

const addReviewByProductId = async (review, req) => {
  try {
    const productId = req.params.id;
    const result = await pool.query(
      'INSERT INTO reviews (produk_id, review) VALUES ($1, $2) RETURNING *',
      [productId, review]
    );
    return result.rows[0];
  } catch (error) {
    throw new Error(`Error adding review for product ID ${productId}: ${error.message}`);
  }
};

const updateReviewById = async (reviewId, newReview) => {
  try {
    const result = await pool.query(
      'UPDATE reviews SET review = $1 WHERE id = $2 RETURNING *',
      [newReview, reviewId]
    );
    return result.rows[0];
  } catch (error) {
    throw new Error(`Error updating review with ID ${reviewId}: ${error.message}`);
  }
};

const deleteReviewById = async (reviewId) => {
  try {
    const result = await pool.query('DELETE FROM reviews WHERE id = $1 RETURNING *', [reviewId]);
    return result.rows[0];
  } catch (error) {
    throw new Error(`Error deleting review with ID ${reviewId}: ${error.message}`);
  }
};

module.exports = {
  getReviewsByProductId,
  addReviewByProductId,
  updateReviewById,
  deleteReviewById,
};