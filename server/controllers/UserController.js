const User = require('../models/UserModel')
const bcrypt = require('bcryptjs')

const createUser = async(req,res)=>{
    try{
        const {username, email, password, firstname, lastname} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            username:username,
            email:email,
            password:hashedPassword,
            firstname:firstname,
            lastname:lastname
        })
        res.status(200).json(user)
    }catch(error){
        res.status(500).json(req.body)
    }
}

module.exports = {createUser}