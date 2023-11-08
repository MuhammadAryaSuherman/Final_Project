const ProductModel = require('../models/produk');

const getProductsById = (req, res) => {
    const id = req.params.id;
    
    ProductModel.getProductsById(id, (err, data) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        return res.status(200).json({ data });
    });
};

const getProducts = (req, res) => {
    ProductModel.getProducts((err, data) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        return res.status(200).json({ data });
    });
};

module.exports = {
    getProducts,
    getProductsById
};
