const User = require('../models/userModel');
const bcrypt = require('bcryptjs'); 

exports.register = async (req, res) => {
    try {
        const { username, email, password, displayName, avatarUrl } = req.body;


        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(400).json({ message: 'Người dùng đã tồn tại!' });
        }


        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);


        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            displayName: displayName || username,
            avatarUrl: avatarUrl || "", 
            isOnline: false,            
            friends: []                 
        });


        await newUser.save();

        res.status(201).json({
            message: 'Đăng ký thành công!',
            userId: newUser._id
        });

    } catch (err) {
        res.status(500).json({ message: 'Lỗi hệ thống: ' + err.message });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password'); 
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};