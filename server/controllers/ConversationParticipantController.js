const { ConversationParticipant } = require("../models/associations")

const showConversationParticipants = async (req, res) => {
    try {
        const conversation_participants = await ConversationParticipant.findAll()
        return res.status(200).json(conversation_participants)
    } catch (error) {
        return res.status(500).json(error)
    }
}

const findConversationParticipants = async(req,res)=>{
    try {
        const {conversationId} = req.params
        const conversation_participants = await ConversationParticipant.findAll({
            where:{
                conversationId:conversationId
            }
        })
        return res.status(200).json(conversation_participants)
    } catch (error) {
        return res.status(500).json(error)
    }
}

const createConversationParticipants = async (req, res) => {
    try {
        const { userId, conversationId } = req.body
        const existing = await ConversationParticipant.findOne({
            where:{
                conversationId, userId
            }
        })
        if(existing){
            return res.status(400).json({error: "User already added to this conversation"})
        }
        const conversation_participants = await ConversationParticipant.create({
            userId: userId,
            conversationId: conversationId,
        });
        return res.status(200).json(conversation_participants)
    } catch (error) {
        if (error.table == "conversations" && error.name == "SequelizeForeignKeyConstraintError") {
            return res.status(400).json({
                message: "conversation id does not exists"
            })
        } else if (error.table == "users" && error.name == "SequelizeForeignKeyConstraintError") {
            return res.status(400).json({
                message: "user does not exists"
            })
        }
        return res.status(500).json(error);
    }
}

//No clear use case as of now 7/22/2025
const updateConversationParticipants = async (req, res) => {
    try {
        const { id, userId, conversationId } = req.body
        const conversation_participants = await ConversationParticipant.update(
            { userId: userId, conversationId: conversationId },
            {
                where: {
                    id: id
                }
            }
        )
        return res.status(200).json(conversation_participants)
    } catch (error) {
        return res.status(500).json(error)
    }
}

//Use Case: If someone leaves the GC
const deleteConversationParticipants = async(req,res) =>{
    try {
        const {id} = req.params
        const conversation_participants = await ConversationParticipant.destroy({
            where:{
                id:id
            }
        })
        return res.status(200).json(conversation_participants)
    } catch (error) {
        return res.status(500).json(error)
    }
}



module.exports = { showConversationParticipants, findConversationParticipants, createConversationParticipants, updateConversationParticipants, deleteConversationParticipants }