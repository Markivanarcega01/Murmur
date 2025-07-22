const { Message} = require('../models/associations')

//Show messages of a conversation room
const showMessages = async (req, res) => {
    try {
        const {id} = req.params
        const messages = await Message.findAll({
            where:{
                conversationId: id,
            }
        })
        return res.status(200).json(messages)
    } catch (error) {

        return res.status(500).json(error)
    }
}

const createMessage = async (req, res) => {
    try {
        const message = await Message.create(req.body)
        return res.status(200).json(message)
    } catch (error) {
        if(error.name == "SequelizeForeignKeyConstraintError"){
            return res.status(400).json({
                error: "Sender does not exists"
            })
        }
        return res.status(500).json(error)
    }
}

const updateMessage = async (req, res) => {
    try {
        //senderId, conversationId, createdAt
        const { id, text } = req.body
        const message = await Message.update(
            { text: text },
            {
                where: {
                    id:id
                }
            })
        return res.status(200).json(message)
    } catch (error) {   
        return res.status(500).json(error)
    }
}

const destroyMessage = async (req, res) => {
    try{
        const {id} = req.params
        const message = await Message.destroy({
            where:{
                id:id
            }
        })
        return res.status(200).json(message)
    }catch(error){
        return res.status(500).json(error)
    }
}



module.exports = { showMessages, createMessage, updateMessage, destroyMessage }