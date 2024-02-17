const jwt = require('jsonwebtoken');

const Error = require('../errors');

const auth = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new Error.Unauthenticated('Please provide authentication token!');
    }

    const token = authHeader.split(' ')[1];
    
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        req.user = {
            userId: decodedToken.userId,
            userName: decodedToken.name,
            userRole: decodedToken.role
        };

        next();
    } catch (error) {
        console.log(error);
        throw new Error.Unauthenticated('Unauthorized!');
    }
}

module.exports = auth;