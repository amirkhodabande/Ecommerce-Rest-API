const User = require('../models/User');
const jwt = require('jsonwebtoken');

const Error = require('../errors');

const authorize = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.userRole)) {
            throw new Error.Unauthorized('Unauthorized to access this route');
        }

        next();
    }
}

module.exports = authorize;