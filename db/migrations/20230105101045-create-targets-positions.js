'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('TargetsPositions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      TargetId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Targets',
          key: 'id',
          onDelete: 'CASCADE',
        },
      },
      positionId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'positions',
          key: 'id',
          onDelete: 'CASCADE',
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
    })
    //fill data with current target data
    const res = await queryInterface.sequelize.query(`SELECT * FROM "Targets"`, {
      model: queryInterface.sequelize.models.Targets,
    })
    const listTargets = res[0]
    const toDay = new Date()
    const month = toDay.getMonth() + 1
    const year = toDay.getFullYear()
    const day = toDay.getDate()
    const date = `${year}-${month}-${day}`
    for (let i = 0; i < listTargets.length; i++) {
      const target = listTargets[i]
      if (!target.positionId) continue
      await queryInterface.sequelize.query(
        `INSERT INTO "TargetsPositions" ("TargetId", "positionId", "createdAt", "updatedAt")
                                            VALUES (${target.id}, ${target.positionId}, '${date}', '${date}')`,
      )
    }
    console.log('TargetsPositions table filled with current data')
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('TargetsPositions')
  },
}
