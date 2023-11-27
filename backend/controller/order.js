const OrderModel = require('../models/order');
const { midtransConfig } = require('../config/config');
const midtransClient = require('midtrans-client');

const OrderController = {
  async createOrder(req, res) {
    const { produk_id, id_game, metode_pembayaran } = req.body;
    console.log(produk_id, id_game, metode_pembayaran)

    if (!produk_id || !id_game || !metode_pembayaran) {
      return res.status(400).json({ error: 'Harap lengkapi semua informasi pesanan.' });
    }

    try {
      const newOrder = await OrderModel.createOrder(produk_id, id_game, metode_pembayaran);
      
    
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
    };console.log(parameter.transaction_details.id)
        
      snap.createTransaction(parameter)
        .then((transactionToken) => {
          console.log(transactionToken)
          res.status(201).json({ message: 'Pesanan berhasil dibuat.', order: newOrder, transactionToken });
        })
        .catch((error) => {
          res.status(500).json({ error: error.message });
        });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = OrderController;
