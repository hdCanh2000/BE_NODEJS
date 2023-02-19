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
    //remove deadline column from targets table
    await queryInterface.removeColumn('Targets', 'deadline')
    // remove managerId
    await queryInterface.removeColumn('Targets', 'managerId')
    // remove quantity
    await queryInterface.removeColumn('Targets', 'quantity')
    //remove recentManDay
    await queryInterface.removeColumn('Targets', 'recentManDay')
    //remove managerComment
    await queryInterface.removeColumn('Targets', 'managerComment')
    //remove unitId
    await queryInterface.removeColumn('Targets', 'unitId')
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    //add deadline column to targets table
    await queryInterface.addColumn('Targets', 'deadline', {
      type: Sequelize.DATE,
      allowNull: true,
    })
    // add managerId
    await queryInterface.addColumn('Targets', 'managerId', {
      type: Sequelize.INTEGER,
      allowNull: true,
    })
    // add quantity
    await queryInterface.addColumn('Targets', 'quantity', {
      type: Sequelize.INTEGER,
      allowNull: true,
    })
    //add recentManDay
    await queryInterface.addColumn('Targets', 'recentManDay', {
      type: Sequelize.DOUBLE,
    })
    //add managerComment
    await queryInterface.addColumn('Targets', 'managerComment', {
      type: Sequelize.TEXT,
    })
    //add unitId
    await queryInterface.addColumn('Targets', 'unitId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'units',
        key: 'id',
        onDelete: 'SET NULL',
      },
    })
  },
}
