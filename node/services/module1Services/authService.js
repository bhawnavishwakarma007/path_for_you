const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
//const User = require('../models/userModel');
const User = require('../../models/module1Models/UserModel');


const AuthService = {
    register: async (name, email, password, contact, user_type) => {
        const hashedPassword = await bcrypt.hash(password, 10);
        return User.create(name, email, hashedPassword, contact, user_type);
    },
    login: async (email, password) => {
        const user = await User.findByEmail(email);
        if (!user || !(await bcrypt.compare(password, user.tp_upassword))) {
            throw new Error('Invalid email or password');
        }
        const token = jwt.sign(
            { id: user.tp_uid, user_type: user.tp_uuser_type }, // user_type token me add kiya
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES }
        );
        return { token, user };
    }
};

module.exports = AuthService;