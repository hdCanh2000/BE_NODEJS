'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
'workTracks',
{
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      kpiNorm_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'kpiNorms',
          key: 'id',
        },
      },
      parent_id: {
        type: Sequelize.INTEGER,
      },
      mission_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'missions',
          key: 'id',
        },
      },
      quantity: {
        type: Sequelize.INTEGER,
      },
      priority: {
        type: Sequelize.INTEGER,
      },
      review: {
        type: Sequelize.STRING,
      },
      node: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING,
      },
      deadline: {
        type: Sequelize.STRING,
      },
      startDate: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    },
{
      tableName: 'workTracks',
      freezeTableName: true,
    },
);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('workTracks');
  },
};
