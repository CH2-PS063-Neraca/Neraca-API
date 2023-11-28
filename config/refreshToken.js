const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateRefreshToken = (id) => {
    return jwt.sign({ id }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: '72h'
    });
}

module.exports = { generateRefreshToken };