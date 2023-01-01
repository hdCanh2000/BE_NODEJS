'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'workTrackLogs', // table name
      'files', // new field name
      {
        type: Sequelize.STRING,
      },
    );
  },

  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('workTrackLogs', 'files');
  },
};
