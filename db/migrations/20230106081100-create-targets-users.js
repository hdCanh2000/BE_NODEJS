'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('TargetsUsers', {
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
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
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
    const res = await queryInterface.sequelize.query(
      `SELECT *
                                                      FROM "Targets"`,
      {
        model: queryInterface.sequelize.models.Targets,
      },
    )
    const listTargets = res[0]
    const toDay = new Date()
    const month = toDay.getMonth() + 1
    const year = toDay.getFullYear()
    const day = toDay.getDate()
    const date = `${year}-${month}-${day}`
    for (let i = 0; i < listTargets.length; i++) {
      const target = listTargets[i]
      if (!target.userId) continue
      await queryInterface.sequelize.query(`INSERT INTO "TargetsUsers" ("TargetId", "userId", "createdAt", "updatedAt")
                                            VALUES (${target.id}, ${target.userId}, '${date}', '${date}')`)
    }
    console.log('TargetsUsers table filled with current data')
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('TargetsUsers')
  },
}
