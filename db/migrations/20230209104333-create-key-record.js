'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('keyRecords', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      keyReportId: {
        type: Sequelize.INTEGER,
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
        references: {
          model: 'keyReports',
          key: 'id'
        }
      },
      value: {
        type: Sequelize.TEXT
      },
      dailyWorkLogId: {
        type: Sequelize.INTEGER,
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
        references: {
          model: 'DailyWorkLogs',
          key: 'id'
        }
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
    await queryInterface.dropTable('keyRecords');
  }
};