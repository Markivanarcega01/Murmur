const User = require('./UserModel')
const Conversation = require('./ConversationModel')
const Message = require('./MessageModel')
const ConversationParticipant = require('./ConversationParticipantModel')

//Message -> User & Conversation

User.hasMany(Message, {foreignKey: 'senderId'})
Message.belongsTo(User, {foreignKey: 'senderId'})

Conversation.hasMany(Message, {foreignKey: 'conversationId'})
Message.belongsTo(Conversation, {foreignKey: 'conversationId'})

//Many to Many: User & Conversation

User.belongsToMany(Conversation, {
    through: ConversationParticipant,
    foreignKey: 'userId',
    as: 'conversations'
})

Conversation.belongsToMany(User, {
    through: ConversationParticipant,
    foreignKey: 'conversationId',
    as: 'participants'
})

module.exports = { sequelize, User, Message, Conversation, ConversationParticipant };