'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addConstraint('conversation_participants',{
      fields: ['userId'],
      type: 'foreign key',
      name: 'user_conversation_association_through_participants',
      references:{
        table: 'users',
        field: 'id'
      },
      onUpdate:'cascade',
      onDelete:'cascade'
    })

    await queryInterface.addConstraint('conversation_participants',{
      fields: ['conversationId'],
      type: 'foreign key',
      name: 'conversation_user_association_through_participants',
      references:{
        table: 'conversations',
        field: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeConstraint('conversation_participants', 'user_conversation_association_through_participants')
    await queryInterface.removeConstraint('conversation_participants', 'conversation_user_association_through_participants')
  }
};
