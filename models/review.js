const pool = require('../config/config');

const getReviews = async (productId) => {
    try {
        const query = 'SELECT * FROM reviews WHERE product_id = $1';
        const result = await pool.query(query, [productId]);
        return result.rows;
    } catch (error) {
        console.error('Error getting reviews:', error);
        throw error;
    }
};

module.exports = {getReviews};