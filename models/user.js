const pool = require('../config/config');

const getUser = async (username) => {
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    return result.rows[0];
};

const doesEmailExist = async (email) => {
    const result = await pool.query('SELECT * FROM users where email = $1', [email]);
    return parseInt(result.rows[0].count) > 0;
};

const createUser = async (newUser) => {
    const { email, username, password } = newUser;
    const result = await pool.query('INSERT INTO users (email, username, password) VALUES ($1, $2, $3) RETURNING *', [email, username, password]);
    console.log('sudah register: dibawah adalah result')
    return "Register sucessfuly";
};

module.exports = {
    getUser, doesEmailExist, createUser
};