const { pool } = require('../config/config');

const OrderModel = {
  async createOrder(produk_id, id_game, metode_pembayaran, user_id) {
    try {
      const result = await pool.query(
        'INSERT INTO "order" (produk_id, id_game, metode_pembayaran, user_id) VALUES ($1, $2, $3, $4) RETURNING *',
        [produk_id, id_game, metode_pembayaran, user_id]
      );
      return result.rows[0];
    } catch (error) {
      throw new Error(`Error creating order: ${error.message}`);
    }
  },

  async getOrdersByUserId(user_id) {
    try {
      const result = await pool.query(
        'SELECT * FROM "order" WHERE user_id = $1',
        [user_id]
      );
      return result.rows;
    } catch (error) {
      throw new Error(`Error getting orders: ${error.message}`);
    }
  },
};

module.exports = OrderModel;
