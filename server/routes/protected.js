const express = require("express")
const router = express.Router()
const {showMessages, createMessage, updateMessage, destroyMessage } = require('../controllers/MessageController')
const {showConversations} = require("../controllers/ConversationController")

//Messages Routes
router.get("/show-messages/:id", showMessages);
router.post("/create-message", createMessage);
router.put("/update-message", updateMessage);
router.delete("/delete-message/:id", destroyMessage);

//Conversation Routes
router.get("/show-conversations", showConversations)
router.get("/create-conversation", showConversations)
router.get("/update-conversation/:id", showConversations)
router.get("/delete-conversations", showConversations)


module.exports = router