const jwt = require('jsonwebtoken');

const createToken = (user) => {
    return jwt.sign({
        name: user.name,
        userId: user._id,
        role: user.role
    }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION_TIME });
} 

module.exports = createToken;