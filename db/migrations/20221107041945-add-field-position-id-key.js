'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'keys',
      'position_id',
      {
        type: Sequelize.INTEGER,
        onDelete: 'SET NULL',
        references: {
          model: 'positions',
          key: 'id',
        },
      },
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('keys', 'position_id');
  },
};
