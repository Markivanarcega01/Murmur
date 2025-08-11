const { Model, DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../database/connect");

class Message extends Model {}

Message.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    text: { type: DataTypes.TEXT, allowNull: false },
  },
  { sequelize, modelName: "Message", tableName: "messages", timestamps: true }
);

module.exports = Message;
