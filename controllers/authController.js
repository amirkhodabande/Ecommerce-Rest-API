const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');
const Error = require('../errors');

const register = async (req, res) => {
    const { email, name, password } = req.body;

    const user = await User.create({ email, name, password });

    const token = jwt.sign({
        name: user.name,
        userId: user._id,
        role: user.role
    }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION_TIME });

    res.status(StatusCodes.CREATED).json({ token });
}

const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new Error.BadRequest('email and password are required!');
    }

    const user = await User.findOne({ email });

    if (!user) {
        throw new Error.BadRequest('Wrong credentials!');
    }

    if (!await user.comparePassword(password)) {
        throw new Error.BadRequest('Wrong credentials!');
    }

    const token = jwt.sign({
        name: user.name,
        userId: user._id,
        role: user.role
    }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION_TIME });

    res.status(StatusCodes.OK).json({ token });
}

module.exports = {
    register, login
}