'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('TargetLogs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      note: {
        type: Sequelize.TEXT
      },
      quantity: {
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.STRING
      },
      files: {
        type: Sequelize.TEXT
      },
      noticedStatus: {
        type: Sequelize.STRING
      },
      noticedDate: {
        type: Sequelize.DATEONLY
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      targetId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete: 'SET NULL',
        references: {
          model: 'Targets',
          key: 'id',
        }
      },
      reportDate: Sequelize.DATEONLY,
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('TargetLogs');
  }
};
