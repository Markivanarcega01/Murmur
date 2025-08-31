const { Op, Sequelize } = require("sequelize");
const {
  Conversation,
  User,
  ConversationParticipant,
} = require("../models/associations");

const showConversations = async (req, res) => {
  try {
    const conversation = await Conversation.findAll();
    return res.status(200).json(conversation);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const createDirectConversation = async (req, res) => {
  try {
    //Check 2 users conversation Ids
    const { userAId, userBId } = req.body;
    if (userAId && userBId) {
      const existingDirectConversation = await Conversation.findOne({
        where: {
          id: {
            [Op.in]: Sequelize.literal(`(
                              SELECT cp.conversationId
                              FROM conversation_participants cp
                              WHERE cp.userId IN ('${userAId}', '${userBId}')
                              GROUP BY cp.conversationId
                              HAVING COUNT(DISTINCT cp.userId) = 2
                          )`),
          },
          type: "direct",
        },
        include: [
          {
            model: User,
            as: "participants",
            attributes: ["id", "username"],
            through: { attributes: [] },
          },
        ],
      });

      if (existingDirectConversation) {
        return res.status(400).json(existingDirectConversation);
      }
    }
    const conversation = await Conversation.create();
    const conversationId = conversation.dataValues.id;
    const conversation_participants = await ConversationParticipant.bulkCreate([
      { userId: userAId, conversationId: conversationId },
      { userId: userBId, conversationId: conversationId },
    ]);
    return res.status(200).json(conversation_participants);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const createConversation = async (req, res) => {
  try {
    const { users, type } = req.body; //array of userId
    const conversation = await Conversation.create({ type });
    const conversationId = conversation.dataValues.id;
    // 2. Prepare participant records
    const participantsToInsert = users.map((userId) => ({
      userId,
      conversationId,
    }));
    const conversation_participants = await ConversationParticipant.bulkCreate(
      participantsToInsert
    );
    return res.status(200).json(conversation_participants);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const updateConvesation = async (req, res) => {
  try {
    const { new_name, id, type } = req.body;
    const update_details = {};
    if (new_name) {
      update_details["name"] = new_name;
    }
    if (type) {
      update_details["type"] = type;
    }
    const conversation = await Conversation.update(update_details, {
      where: {
        id: id,
      },
    });
    return res.status(200).json(conversation);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const deleteConversation = async (req, res) => {
  try {
    const { id } = req.params;
    const conversation = await Conversation.destroy({
      where: {
        id: id,
      },
    });
    return res.status(200).json(conversation);
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = {
  showConversations,
  createConversation,
  createDirectConversation,
  updateConvesation,
  deleteConversation,
};
