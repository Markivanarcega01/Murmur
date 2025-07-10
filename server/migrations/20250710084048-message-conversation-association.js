'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addConstraint('messages', {
      fields: ['conversationId'],
      type: 'foreign key',
      name: 'message_conversation_association',
      references: {
        table: 'conversations',
        field: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    })
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeConstraint('messages', {
      fields: ['conversationId'],
      type: 'foreign key',
      name: 'message_conversation_association',
      references: {
        table: 'conversations',
        field: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    })
  }
};
