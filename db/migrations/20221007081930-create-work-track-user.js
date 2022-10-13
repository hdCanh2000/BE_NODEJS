'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
'workTrackUsers',
{
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' },
      },
      workTrackId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'workTracks', key: 'id' },
      },
      isResponsible: {
        type: Sequelize.BOOLEAN,
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
      tableName: 'workTrackUsers',
      freezeTableName: true,
    },
);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('workTrackUsers');
  },
};
