const { StatusCodes } = require("http-status-codes");
const User = require("../models/User");
const Error = require("../errors");

const updatePassword = async (req, res) => {
    const { email, oldPassword, newPassword } = req.body;

    if (!email || !oldPassword || !newPassword ) {
        throw new Error.BadRequest('email and password are required!');
    }

    const user = await User.findOne({ email });

    if (!user) {
        throw new Error.BadRequest('Wrong credentials!');
    }

    if (!await user.comparePassword(oldPassword)) {
        throw new Error.BadRequest('Wrong credentials!');
    }

    user.password = newPassword;

    await user.save();

    res.status(StatusCodes.OK).json({ message: 'Password updated successfully!'});
}

module.exports = {
    updatePassword
}