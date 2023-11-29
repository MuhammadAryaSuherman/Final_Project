const OrderModel = require('../models/order');
const { midtransConfig } = require('../config/config');
const midtransClient = require('midtrans-client');
const { decodeToken } = require('../middleware/auth')

const OrderController = {
  async createOrder(req, res) {
    const token = req.header('x-auth-token');

    if (!token) {
      return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    try {
      const { id: user_id } = decodeToken(token); 
      
      const { produk_id, id_game, metode_pembayaran } = req.body;
      console.log(produk_id, id_game, metode_pembayaran, user_id);

      if (!produk_id || !id_game || !metode_pembayaran || !user_id) {
        return res.status(400).json({ error: 'Harap lengkapi semua informasi pesanan.' });
      }

      const newOrder = await OrderModel.createOrder(produk_id, id_game, metode_pembayaran, user_id);
      
      const snap = new midtransClient.Snap({
        isProduction: false, 
        serverKey: midtransConfig.serverKey,
        clientKey: midtransConfig.clientKey,
      });

      const parameter = {
        transaction_details: {
          order_id: newOrder.id,
          gross_amount: 100000,
        },
      };
      
      snap.createTransaction(parameter)
        .then((transactionToken) => {
          console.log(transactionToken);
          res.status(201).json({ message: 'Pesanan berhasil dibuat.', order: newOrder, transactionToken });
        })
        .catch((error) => {
          res.status(500).json({ error: error.message });
        });
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: error.message });
    }
  },

  async getOrdersByUserId(req, res) {
    const { user_id } = req.params;
    try {
      const orders = await OrderModel.getOrdersByUserId(user_id);
      res.status(200).json({ orders });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = OrderController;