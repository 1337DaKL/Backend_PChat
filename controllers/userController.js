const User = require('../models/userModel');

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users); // Trả về JSON cho Android
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};