'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'workTracks',
      'key_id',
      {
        type: Sequelize.INTEGER,
        onDelete: 'SET NULL',
        references: {
          model: 'keys',
          key: 'id',
        },
      },
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('workTracks', 'key_id');
  },
};
