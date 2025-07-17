const express = require("express")
const router = express.Router()
const {createMessage, updateMessage, deleteMessage, showMessages} = require('../controllers/MessageController')

router.get("/show-messages/:conversationId", showMessages);
router.post("/create-message", createMessage);
router.put("/update-message", updateMessage);
router.delete("/delete-message", deleteMessage);

module.exports = router