const jwt = require('jsonwebtoken');

const generateAuthToken = (id) => {
    const token = jwt.sign({ id }, process.env.JWT_KEY);
    return token;
};

module.exports = generateAuthToken;
