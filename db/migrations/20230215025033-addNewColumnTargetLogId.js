'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction((t) => Promise.all([
        queryInterface.addColumn('keyRecords', 'targetLogId', {
          type: Sequelize.INTEGER,
          onDelete: 'SET NULL',
          onUpdate: 'CASCADE',
          references: {
            model: 'TargetLogs',
            key: 'id',
          },
        }, { transaction: t }),
      ]));
  },

  async down(queryInterface) {
    return queryInterface.sequelize.transaction((t) => Promise.all([
        queryInterface.removeColumn('keyRecords', 'targetLodId', { transaction: t }),
      ]));
  },
};
