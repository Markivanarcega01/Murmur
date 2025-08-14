const { Op, Sequelize } = require("sequelize")
const { Conversation, User, ConversationParticipant } = require("../models/associations")

const showConversations = async (req, res) => {
    try {
        const conversation = await Conversation.findAll()
        return res.status(200).json(conversation)
    } catch (error) {
        return res.status(500).json(error)
    }
}

const createDirectConversation = async (req, res) => {
    try {
        //Check 2 users conversation Ids
        const { userAId, userBId } = req.body
        if (userAId && userBId) {
            const existingConversation = await Conversation.findOne({
                where: {
                    id: {
                        [Op.in]: Sequelize.literal(`(
                            SELECT cp.conversationId
                            FROM conversation_participants cp
                            WHERE cp.userId IN ('${userAId}', '${userBId}')
                            GROUP BY cp.conversationId
                            HAVING COUNT(DISTINCT cp.userId) = 2
                        )`)
                    },
                    name:null
                },
                include: [
                    {
                        model: User,
                        as: 'participants',
                        attributes: ['id', 'username'],
                        through: { attributes: [] }
                    }
                ]
            });
            if (existingConversation) {
                return res.status(400).json(existingConversation)
            }
        }
        const conversation = await Conversation.create(req.body)
        const conversation_participants = await ConversationParticipant.bulkCreate([
            {userId:userAId, conversationId: conversation.dataValues.id},
            {userId:userBId, conversationId:conversation.dataValues.id}
        ])
        return res.status(200).json(conversation_participants)
    } catch (error) {
        return res.status(500).json(error)
    }
}

const createConversation = async(req,res)=>{
    try {
        const conversation = await Conversation.create(req.body)
        return res.status(200).json(conversation)
    } catch (error) {
        return res.status(500).json(error)
    }
}

const updateConvesation = async (req, res) => {
    try {
        const { new_name, id } = req.body
        const conversation = await Conversation.update(
            { name: new_name },
            {
                where: {
                    id: id
                }
            }
        )
        return res.status(200).json(conversation)
    } catch (error) {
        return res.status(500).json(error)
    }
}

const deleteConversation = async (req, res) => {
    try {
        const { id } = req.params
        const conversation = await Conversation.destroy({
            where: {
                id: id
            }
        })
        return res.status(200).json(conversation)
    } catch (error) {
        return res.status(500).json(error)
    }
}

module.exports = { showConversations, createConversation, createDirectConversation, updateConvesation, deleteConversation }