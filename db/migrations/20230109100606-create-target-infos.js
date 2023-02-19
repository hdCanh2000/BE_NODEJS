'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('TargetInfos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      executionPlan: Sequelize.TEXT,
      description: Sequelize.TEXT,
      quantity: Sequelize.INTEGER,
      unitId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'units',
          key: 'id',
          onDelete: 'SET NULL',
        },
      },
      positionId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'positions',
          key: 'id',
          onDelete: 'SET NULL',
        },
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'users',
          key: 'id',
          onDelete: 'SET NULL',
        },
      },
      manDay: Sequelize.DOUBLE,
      startDate: Sequelize.DATE,
      deadline: Sequelize.DATE,
      status: Sequelize.TEXT,
      managerComment: Sequelize.TEXT,
      managerManDay: Sequelize.INTEGER,
      targetId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Targets',
          key: 'id',
          onDelete: 'SET NULL',
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
    //mỉgrate data from current target table to TargetInfos
    const [data, medata] = await queryInterface.sequelize.query(`SELECT *
                                                                 FROM "Targets"`)
    let success = 0
    for (const target of data) {
      try {
        const targetInfo = {
          name: target.name,
          description: target.description,
          executionPlan: target.executionPlan,
          quantity: target.quantity,
          managerComment: target.managerComment,
          managerManDay: target.recentManDay,
          startDate: target.createdAt,
          deadline: target.deadline,
          manDay: target.manDay,
          status: target.status,
          targetId: target.id,
          unitId: target.unitId,
          createdAt: new Date(),
          updatedAt: new Date(),
        }
        //find position
        const [positions] = await queryInterface.sequelize.query(`SELECT *
                                                                  FROM "TargetsPositions"
                                                                  WHERE "TargetId" = ${target.id}`)
        if (positions.length > 0) {
          targetInfo.positionId = positions[0].positionId
        }
        // find user
        const [users] = await queryInterface.sequelize.query(`SELECT *
                                                              FROM "TargetsUsers"
                                                              WHERE "TargetId" = ${target.id}`)
        if (users.length > 0) {
          targetInfo.userId = users[0].userId
        }
        //save targetInfo
        await queryInterface.insert(null, 'TargetInfos', targetInfo)
        //get created targetInfo
        const [targetInfos] = await queryInterface.sequelize.query(`SELECT *
                                                                    FROM "TargetInfos"
                                                                    WHERE "targetId" = ${target.id}`)
        const targetInfoId = targetInfos[0].id
        //update TaregetLogs'targetId to TargetInfo's id
        await queryInterface.sequelize.query(`UPDATE "TargetLogs"
                                              SET "targetId" = ${targetInfoId}
                                              WHERE "targetId" = ${target.id}`)
        success++
      } catch (err) {
        console.log(err)
      }
    }
    console.log(`Migrate ${success} / ${data.length} targets to TargetInfos`)
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('TargetInfos')
  },
}
