const { pool } = require('../config/config');

const getReviewsByProductId = async (productId) => {
  try {
    const result = await pool.query('SELECT * FROM reviews WHERE produk_id = $1', [productId]);
    return result.rows;
  } catch (error) {
    throw new Error(`Error getting reviews by product ID: ${error.message}`);
  }
};

const addReviewByProductId = async (produk_id, review) => {
  try {
    const result = await pool.query(
      'INSERT INTO reviews (produk_id, review) VALUES ($1, $2) RETURNING *',
      [produk_id, review]
    );
    return result.rows[0];
  } catch (error) {
    throw new Error(`Error adding review for product ID ${produk_id}: ${error.message}`);
  }
};

module.exports = { getReviewsByProductId, addReviewByProductId };
