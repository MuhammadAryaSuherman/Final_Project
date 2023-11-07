const userModel = require('../models/user');
const bcrypt = require('bcrypt');
const generateAuthToken = require('../middleware/auth');

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

    static async register(req, res) {
        const { email, username, password} = req.body;
    
        const newUser = {
            email, username, password,
        };

        try {
            const user = await userModel.createUser(newUser);
            res.status(201).json({ message: 'Registration successful', user });
        } catch (error) {
            console.error('Error during registration:', error);
            res.status(500).json({ message: 'Registration error' });
        }
    }
};
module.exports = UserController;
