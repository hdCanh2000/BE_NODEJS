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
    await queryInterface.removeColumn('Targets', 'positionId');
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.addColumn('Targets', 'positionId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'positions',
        key: 'id',
      },
      onDelete: 'SET NULL',
    });
  }
};
