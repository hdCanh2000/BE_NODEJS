'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'workTracks', // table name
      'createdBy', // new field name
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
      },
    );
    await queryInterface.changeColumn('workTracks', 'node', {
      type: Sequelize.TEXT,
    });
    await queryInterface.renameColumn('workTracks', 'node', 'note');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('workTracks', 'createdBy');
  },
};
