const OrderModel = require('../models/order');

const OrderController = {
  async createOrder(req, res) {
    const { produk_id, id_game, metode_pembayaran } = req.body;
    console.log(produk_id, id_game, metode_pembayaran)

    if (!produk_id || !id_game || !metode_pembayaran) {
      return res.status(400).json({ error: 'Harap lengkapi semua informasi pesanan.' });
    }

    try {
      const newOrder = await OrderModel.createOrder(produk_id, id_game, metode_pembayaran);
      
      res.status(201).json({ message: 'Pesanan berhasil dibuat.', order: newOrder });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = OrderController;
