// controllers/orderController.js

const OrderModel = require('../models/order');

const OrderController = {
  async createOrder(req, res) {
    const { productId, gameId, paymentMethod } = req.body;

    // Validasi input
    if (!productId || !gameId || !paymentMethod) {
      return res.status(400).json({ error: 'Harap lengkapi semua informasi pesanan.' });
    }

    try {
      // Buat pesanan baru menggunakan OrderModel
      const newOrder = await OrderModel.createOrder(productId, gameId, paymentMethod);
      
      res.status(201).json({ message: 'Pesanan berhasil dibuat.', order: newOrder });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = OrderController;
