const { StatusCodes } = require("http-status-codes");
const User = require("../../models/User");
const Error = require("../../errors");

const index = async (req, res) => {
    const users = await User.find({role: 'user'}).select('-password');

    res.status(StatusCodes.OK).json({ users });
}

const show = async (req, res) => {
    const user = await User.findOne({role: 'user', _id: req.params.id}).select('-password');

    if(!user) {
        throw new Error.NotFound(`No user found with id: ${req.params.id}`);
    }

    res.status(StatusCodes.OK).json({ user });
}

const update = async (req, res) => {

}

const updatePassword = async (req, res) => {

}

module.exports = {
    index, show, update, updatePassword
}