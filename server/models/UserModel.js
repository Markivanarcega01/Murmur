require('dotenv').config();
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database/connect');
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

class User extends Model { }

User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    firstname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: false,
    }
},
    {
        sequelize,
        modelName: 'User',
        tableName: 'users',
        timestamps: true
    }
)

User.findUser = async (username) => {
    try {
        const user = await User.findOne({
            where: {
                username: username
            }
        });
        if (!user) {
            throw new Error('User not found')
        }
        return user;
    } catch (error) {
        throw error
    }
}

User.createUser = async (credentials) => {
    try {
        const { username, password, email, firstname, lastname } = credentials;
        const hashedPassword = await bcrypt.hash(password, 10);

        const isUserExists = await User.findOne({
            where:{
                username:username
            }
        });
        if (isUserExists) {
            throw new Error('User already exists');
        }
        const user = await User.create({
            username: username,
            password: hashedPassword,
            email: email,
            firstname: firstname,
            lastname: lastname
        })
        return user;
    } catch (error) {
        throw error;
    }
}


User.prototype.createJWT = function(){
    return jwt.sign(
        {id:this.id, username:this.username},
        process.env.JWT_SECRET,
        {expiresIn: "30d"}
    )
}



module.exports = User;