const bcrypt = require('bcrypt');
const { pool } = require('../config/config');

const getUserByUsernameOrEmail = async (identifier) => {
    const result = await pool.query('SELECT * FROM users WHERE username = $1 OR email = $1', [identifier]);
    return result.rows[0];
};

const doesEmailExist = async (email) => {
    const result = await pool.query('SELECT * FROM users where email = $1', [email]);
    return parseInt(result.rows[0].count) > 0;
};

const createUser = async (newUser) => {
    const { email, username, password } = newUser;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        const result = await pool.query('INSERT INTO users (email, username, password) VALUES ($1, $2, $3) RETURNING *', [email, username, hashedPassword]);
        console.log('sudah register: dibawah adalah result')
        return "Register sucessfuly";
    } catch (error) {
        if (error.code === '23505') {
            throw new Error('Email already in use');
        }
        throw error;
    }
};

module.exports = {
    getUserByUsernameOrEmail, doesEmailExist, createUser
};
