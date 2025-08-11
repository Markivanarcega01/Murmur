"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn("conversation_participants", "userId", {
      type: Sequelize.UUID,
      allowNull: false,
    });
    await queryInterface.addColumn(
      "conversation_participants",
      "conversationId",
      {
        type: Sequelize.UUID,
        allowNull: false,
      }
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn("conversation_participants", "userId");
    await queryInterface.removeColumn(
      "conversation_participants",
      "conversationId"
    );
  },
};
