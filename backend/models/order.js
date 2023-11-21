const { pool } = require('../config/config');

const OrderModel = {
  async createOrder(produk_id, id_game, metode_pembayaran) {
    try {
      const result = await pool.query(
        'INSERT INTO "order" (produk_id, id_game, metode_pembayaran) VALUES ($1, $2, $3) RETURNING *',
        [produk_id, id_game, metode_pembayaran]
      );
      return result.rows[0];
    } catch (error) {
      throw new Error(`Error creating order: ${error.message}`);
    }
  },
};

module.exports = OrderModel;
