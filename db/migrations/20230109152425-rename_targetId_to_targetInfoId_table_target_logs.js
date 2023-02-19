'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    //add targetInfoId column to targetLogs table with value equal to targetId
    await queryInterface.addColumn('TargetLogs', 'targetInfoId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'TargetInfos',
        key: 'id',
        onDelete: 'SET NULL',
      },
    })
    await queryInterface.sequelize.query(`UPDATE "TargetLogs"
                                          SET "targetInfoId" = "targetId"
                                          WHERE "targetId" IS NOT NULL`)
    console.log("targetInfoId column added to TargetLogs table")
    //remove targetId column from targetLogs table
    await queryInterface.removeColumn('TargetLogs', 'targetId')
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('TargetLogs', 'targetInfoId')
    await queryInterface.addColumn('TargetLogs', 'targetId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'Targets',
        key: 'id',
        onDelete: 'SET NULL',
      }
    })
  },
}
