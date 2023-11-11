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

const createUser = async ({ email, username, password }) => {
    const hashedpassword = await bcrypt.hash(password, 10);

    try {
        const result = await pool.query('INSERT INTO users (email, username, password) VALUES ($1, $2, $3) RETURNING *', [email, username, hashedpassword]);
        return result.rows[0];
    } catch (error) {
        if (error.code === '23505' && error.constraint === 'users_email_key') {
            throw new Error(`The email '${email}' is already in use.`);
        }
        throw new Error(`Registration error: ${error.message}`);
    }
};

module.exports = {
    getUserByUsernameOrEmail, doesEmailExist, createUser
};
