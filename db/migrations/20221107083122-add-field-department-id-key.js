/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'keys',
      'department_id',
      {
        type: Sequelize.INTEGER,
        onDelete: 'SET NULL',
        references: {
          model: 'departments',
          key: 'id',
        },
      },
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('keys', 'department_id');
  },
};
