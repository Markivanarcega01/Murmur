const User = require('../models/UserModel')
const bcrypt = require('bcryptjs')

const registerUser = async (req, res) => {
    try {
        const user = await User.createUser(req.body);
        const token = user.createJWT();
        return res.status(200).json({user:user,token:token})
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findUser(username);
        const token = user.createJWT();
        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Incorrect password" })
        }
        return res.status(200).json({user:user, token:token})
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

module.exports = {registerUser, loginUser}