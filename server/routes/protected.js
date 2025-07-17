const express = require("express")
const router = express.Router()
const {showMessages, createMessage, updateMessage, destroyMessage } = require('../controllers/MessageController')
const {showConversations} = require("../controllers/ConversationController")

//Messages Routes
router.get("/show-messages/:conversationId", showMessages);
router.post("/create-message", createMessage);
router.put("/update-message", updateMessage);
router.delete("/delete-message", destroyMessage);

//Conversation Routes
router.get("/show-conversations", showConversations)

module.exports = router