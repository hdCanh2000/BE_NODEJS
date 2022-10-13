'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
'positions',
{
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.TEXT,
      },
      code: {
        type: Sequelize.STRING,
      },
      address: {
        type: Sequelize.STRING,
      },
      manager: {
        type: Sequelize.INTEGER,
      },
      position_levels_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'positionLevels',
          key: 'id',
        },
      },
      department_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'departments',
          key: 'id',
        },
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
      tableName: 'positions',
      freezeTableName: true,
    },
);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('positions');
  },
};
