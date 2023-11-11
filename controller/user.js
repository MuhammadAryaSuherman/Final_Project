const userModel = require('../models/user');
const bcrypt = require('bcrypt');
const { generateAuthToken } = require('../middleware/auth');

class UserController {
    static async login(req, res) {
        const { email, username, password } = req.body;
        const user = await userModel.getUserByUsernameOrEmail(email || username);

        if (!user) return res.status(400).json({ message: 'User not found.' });

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(400).json({ message: 'Invalid username or password.' });

        const token = generateAuthToken({ id: user.id, username: user.username, email: user.email });
        res.header('x-auth-token', token).json({ message: 'Login successful', token: token });
    };

    static async register(req, res) {
        const { email, username, password } = req.body;
    
        const newUser = {
            email,
            username,
            password,
        };
    
        try {
            const user = await userModel.createUser(newUser);
            const loginLink = '/login';
    
            res.status(201).json({
                message: 'Registration successful. Please proceed to login.',
                user,
                loginLink,
            });
        } catch (error) {
            if (error.message === 'Email already in use') {
                return res.status(400).json({ message: 'Email already in use' });
            }
            console.error('Error during registration:', error);
            res.status(500).json({ message: 'Registration error' });
        }
    }
    
};
module.exports = UserController;