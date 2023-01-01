'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('DailyWorkLogs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      note: Sequelize.TEXT,
      quantity: Sequelize.INTEGER,
      status: Sequelize.STRING,
      files: Sequelize.TEXT,
      noticedStatus: Sequelize.STRING,
      noticedDate: Sequelize.DATEONLY,
      reportDate: Sequelize.DATEONLY,
      dailyWorkId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('DailyWorkLogs');
  }
};
