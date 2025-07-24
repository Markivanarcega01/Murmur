const express = require("express")
const router = express.Router()
const {showMessages, createMessage, updateMessage, destroyMessage } = require('../controllers/MessageController')
const {showConversations, createConversation, updateConvesation, deleteConversation} = require("../controllers/ConversationController");
const { showConversationParticipants, createConversationParticipants, updateConversationParticipants, deleteConversationParticipants, findConversationParticipants } = require("../controllers/ConversationParticipantController");

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

//Conversation Participants Routes
router.get("/show-conversation-participants", showConversationParticipants);
router.get("/find-conversation-participants/:conversationId", findConversationParticipants);
router.post("/create-conversation-participants", createConversationParticipants)
router.put("/update-conversation-participant", updateConversationParticipants);
router.delete("/delete-conversation-participant/:id", deleteConversationParticipants);

module.exports = router