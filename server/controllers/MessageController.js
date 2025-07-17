const { Message} = require('../models/associations')

const show = async (req, res) => {
    try {
        const {conversationId} = req.params
        const messages = await Message.findAll({
            where:{
                conversationId: conversationId,
            }
        })
        return res.status(200).json(messages)
    } catch (error) {
        return res.status(500).json(error)
    }
}

const create = async (req, res) => {
    try {
        const message = await Message.create(req.body)
        return res.status(200).json(message)
    } catch (error) {
        return res.status(500).json(error)
    }
}

const update = async (req, res) => {
    try {
        //senderId, conversationId, createdAt
        const { senderId, conversationId, createdAt, text } = req.body
        const message = await Message.update(
            { text: text },
            {
                where: {
                    senderId: senderId,
                    conversationId: conversationId,
                    createdAt:createdAt
                }
            })
        return res.status(200).json(message)
    } catch (error) {   
        return res.status(500).json(error)
    }
}

const destroy = async (req, res) => {
    try{
        const {senderId, conversationId, createdAt} = req.body
        const message = await Message.destroy({
            where:{
                senderId: senderId,
                conversationId: conversationId,
                createdAt: createdAt
            }
        })
        return res.status(200).json(message)
    }catch(error){
        return res.status(500).json(error)
    }
}



module.exports = { show, create, update, destroy}