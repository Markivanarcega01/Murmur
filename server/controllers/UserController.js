const bcrypt = require('bcryptjs')
const {User, Message} = require('../models/associations')

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

const getUsers = async(req,res)=>{
    try {
        const users = await User.findAll({
            include:[{model: Message, attributes:['text']}]
        });

        return res.status(200).json(users)
    } catch (error) {
        return res.status(500).json(error)
    }
}

module.exports = {registerUser, loginUser, getUsers}