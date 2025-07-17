const express = require("express")
const router = express.Router()
const {show, create, update, destroy} = require('../controllers/MessageController')

//Messages Routes
router.get("/show-messages/:conversationId", show);
router.post("/create-message", create);
router.put("/update-message", update);
router.delete("/delete-message", destroy);

module.exports = router