const {User,Message, ConversationParticipant} = require('../models/associations')

//Show messages of a conversation room
const showMessages = async (req, res) => {
    try {
        const {id} = req.params

        //Check if the user is in the conversation room
        const userId = req.user.id
        const isParticipant = await ConversationParticipant.findOne({
            where:{
                userId:userId,
                conversationId:id
            }
        })
        if(!isParticipant){
            return res.status(403).json({
                message: "Access Denied"
            })
        }

        //Show the message of the conversation
        const messages = await Message.findAll({
            where:{
                conversationId: id,
            },
            include:[{model:User, attributes:['username']}]
        })
        return res.status(200).json(messages)
    } catch (error) {

        return res.status(500).json({ message: "Server Error", error: error.message })
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