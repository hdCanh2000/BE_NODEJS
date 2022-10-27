'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'positionLevels', // table name
      'description', // new field name
      {
        type: Sequelize.TEXT,
      },
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('positionLevels', 'description');
  },
};
