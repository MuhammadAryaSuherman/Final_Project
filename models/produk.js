const pool = require('../config/config');

const getProductsById = (id, callback) => {
    pool.query(`SELECT * FROM produk WHERE id = $1`, [id], (err, results) => {
        if (err) {
            return callback(err, null);
        }
        return callback(null, results.rows);
    });
};

const getProducts = (callback) => {
    pool.query('SELECT * FROM produk', (err, results) => {
        if (err) {
            return callback(err, null);
        }
        return callback(null, results.rows);
    });
};

module.exports = {
    getProducts,
    getProductsById
};
