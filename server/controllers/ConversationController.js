const {Conversation} = require("../models/associations")

const showConversations = async(req,res)=>{
    try{
        const conversation = await Conversation.findAll()
        return res.status(200).json(conversation)
    }catch(error){
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

const updateConvesation = async(req,res)=>{
    try {
        const {new_name, id} = req.body
        const conversation = await Conversation.update(
            {name: new_name},
            {
                where:{
                    id:id
                }
            }
        )
        return res.status(200).json(conversation)
    } catch (error) {
        return res.status(500).json(error)
    }
}

const deleteConversation = async(req,res)=>{
    try {
        const {id} = req.params
        const conversation = await Conversation.destroy({
            where:{
                id:id
            }
        })
        return res.status(200).json(conversation)
    } catch (error) {
        return res.status(500).json(error)
    }
}

module.exports = {showConversations, createConversation, updateConvesation, deleteConversation}