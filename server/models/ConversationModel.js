const { Model, DataTypes } = require("sequelize")
const sequelize = require('../database/connect')

class Conversation extends Model { }

Conversation.init({
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: true }
}, { sequelize, modelName: "Conversation" })

module.exports = Conversation;