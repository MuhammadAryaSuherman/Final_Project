const { pool } = require('../config/config');

const OrderModel = {
  async createOrder(productId, gameId, paymentMethod) {
    try {
      const result = await pool.query(
        'INSERT INTO orders (produk_id, id_game, metode_pembayaran) VALUES ($1, $2, $3) RETURNING *',
        [productId, gameId, paymentMethod]
      );
      return result.rows[0];
    } catch (error) {
      throw new Error(`Error creating order: ${error.message}`);
    }
  },
};

module.exports = OrderModel;
