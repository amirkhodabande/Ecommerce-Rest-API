const { StatusCodes } = require("http-status-codes");
const User = require("../models/User");
const Error = require("../errors");
const utils = require('../utils');

const update = async (req, res) => {
    const { email, name } = req.body;

    if (!email || !name) {
        throw new Error.BadRequest('email and name are required!');
    }

    const user = await User.findByIdAndUpdate(
        req.user.userId,
        { email, name },
        {new: true, runValidators: true}
    );

    const token = utils.createToken(user);

    res.status(StatusCodes.CREATED).json({ token });
}

const updatePassword = async (req, res) => {
    const {oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
        throw new Error.BadRequest('password is required!');
    }

    const user = await User.findById(req.user.userId);

    if (!user) {
        throw new Error.BadRequest('Wrong credentials!');
    }

    if (!await user.comparePassword(oldPassword)) {
        throw new Error.BadRequest('Wrong credentials!');
    }

    user.password = newPassword;

    await user.save();

    res.status(StatusCodes.OK).json({ message: 'Password updated successfully!' });
}

module.exports = {
    update,
    updatePassword
}