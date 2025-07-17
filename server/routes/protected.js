const express = require("express")
const router = express.Router()
const {showMessages, createMessage, updateMessage, destroyMessage } = require('../controllers/MessageController')
const {showConversations, createConversation, updateConvesation, deleteConversation} = require("../controllers/ConversationController")

//Messages Routes
router.get("/show-messages/:id", showMessages);
router.post("/create-message", createMessage);
router.put("/update-message", updateMessage);
router.delete("/delete-message/:id", destroyMessage);

//Conversation Routes
router.get("/show-conversations", showConversations)
router.post("/create-conversation", createConversation)
router.put("/update-conversation", updateConvesation)
router.delete("/delete-conversation/:id", deleteConversation)


module.exports = router