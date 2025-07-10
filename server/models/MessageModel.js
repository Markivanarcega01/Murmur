const {Model, DataTypes} = require('sequelize')
const sequelize = require('../database/connect')

class Message extends Model{}

Message.init({
    id: {type: DataTypes.INTEGER, autoIncrement:true, primaryKey:true},
    text: {type: DataTypes.TEXT, allowNull:false},
}, {sequelize, modelName:"Message", tableName:"messages", timestamps:true })

module.exports = Message;