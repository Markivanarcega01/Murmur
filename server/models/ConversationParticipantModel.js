const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database/connect");

class ConversationParticipant extends Model {}

ConversationParticipant.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
  },
  {
    sequelize,
    modelName: "ConversationParticipant",
    tableName: "conversation_participants",
    timestamps: true,
  }
);

module.exports = ConversationParticipant;
