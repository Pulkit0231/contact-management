const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
dotenv.config();

const secretKey = process.env.SECRETKEY; // Store in environment variable in production

// Generate a token
const generateToken = (user) => {
    return jwt.sign({ id: user.id, email: user.email }, secretKey, { expiresIn: '4h' });
};

// Verify a token
const verifyToken = (token) => {
    return jwt.verify(token, secretKey);
};

module.exports = { generateToken, verifyToken };
