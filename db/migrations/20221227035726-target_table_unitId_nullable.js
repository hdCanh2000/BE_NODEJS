'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return await Promise.all([
      queryInterface.changeColumn('Targets', 'unitId', {
        type: Sequelize.INTEGER,
        allowNull: true
      })
    ])
  },

  async down (queryInterface, Sequelize) {
    return await Promise.all([
      queryInterface.changeColumn('Targets', 'unitId', {
        type: Sequelize.INTEGER,
        allowNull: true
      })
    ])
  }
};
