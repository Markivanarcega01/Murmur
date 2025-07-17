const express = require("express")
const router = express.Router()
const {showMessages, createMessage, updateMessage, destroyMessage } = require('../controllers/MessageController')
const {showConversations} = require("../controllers/ConversationController")

//Messages Routes
router.get("/show-messages/:conversationId", show);
router.post("/create-message", create);
router.put("/update-message", update);
router.delete("/delete-message", destroy);

//Conversation Routes
router.get("/show-conversations", showConversations)

module.exports = router