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
    await queryInterface.addColumn('conversations', 'createdAt',{
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue:Sequelize.literal("CURRENT_TIMESTAMP")
    })
    await queryInterface.addColumn('conversations', 'updatedAt',{
      type: Sequelize.DATE,
      allowNull:false,
      defaultValue:Sequelize.literal("CURRENT_TIMESTAMP")
    })
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('conversations', 'createdAt')
    await queryInterface.removeColumn('conversations', 'updatedAt')
  }
};
