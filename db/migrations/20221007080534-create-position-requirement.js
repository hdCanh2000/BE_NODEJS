'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
'positionRequirements',
{
      requirementId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'requirements',
          key: 'id',
        },
      },
      positionId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'positions',
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
      tableName: 'positionRequirements',
      freezeTableName: true,
    },
);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('positionRequirements');
  },
};
