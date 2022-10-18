'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'workTrackUsers', // table name
      'isCreated', // new field name
      {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
    );
    await queryInterface.changeColumn('workTracks', 'node', {
      type: Sequelize.TEXT,
    });
    await queryInterface.renameColumn('workTracks', 'node', 'note');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('workTrackUsers', 'isCreated');
  },
};
