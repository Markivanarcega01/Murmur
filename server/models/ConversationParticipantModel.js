const {Model, DataTypes} = require('sequelize')
const sequelize = require("../database/connect")

class ConversationParticipant extends Model{}

ConversationParticipant.init({
    id: {type: DataTypes.INTEGER, autoIncrement:true, primaryKey:true}
}, {sequelize, modelName:"ConversationParticipant", tableName:'conversation_participants'})

module.exports = ConversationParticipant;

