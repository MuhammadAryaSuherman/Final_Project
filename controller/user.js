// controllers/users.js
const userModel = require('../models/user');
const bcrypt = require('bcrypt');
const generateAuthToken = require('./token');

class UserController {
    static async login(req, res) {
        const { username, password } = req.body;
        const user = await userModel.getUser(username);

        if (!user) return res.status(400).json({ message: 'Invalid username or password.' });

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(400).json({ message: 'Invalid username or password.' });

        const token = generateAuthToken(user.id);
        res.header('x-auth-token', token).json({ message: 'Login successful', token: token });
    };
}

module.exports = UserController;
