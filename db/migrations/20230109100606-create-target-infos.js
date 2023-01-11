'use strict'
const model = require('../../models')
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
    console.log('Start migrate data from current target table to TargetInfos table')
    const targets = await model.Target.findAll({
      include: [
        {
          model: model.TargetLog,
        },
        {
          model: model.positions,
        },
        {
          model: model.users,
        },
      ],
    })
    console.log('Found:', targets.length, 'targets existed in databse')
    let success = 0
    for (let i = 0; i < targets.length; i++) {
      try {
        const target = targets[i]
        //skip deleted targets
        if (target.deletedAt !== null) {
          continue
        }
        const targetInfo = {
          name: target.name,
          executionPlan: target.executionPlan,
          description: target.description,
          quantity: target.quantity,
          unitId: target.unitId,
          manDay: target.manDay,
          managerComment: target.managerComment,
          managerManDay: target.recentManDay,
          startDate: target.createdAt,
          deadline: target.deadline,
          status: target.status,
          targetId: target.id,
        }
        if (target.positions.length > 0) {
          targetInfo.positionId = target.positions[0].id
        }
        if (target.users.length > 0) {
          targetInfo.userId = target.users[0].id
        }
        const savedTargetInfo = await model.TargetInfos.create(targetInfo)
        const savedTargetInfoId = savedTargetInfo.id
        //update targetLog
        const targetLogs = target.TargetLogs.map(async targetLog => {
          const inDbLogs = await model.TargetLog.findOne({ where: { id: targetLog.id } })
          if (inDbLogs) {
            const updated = await inDbLogs.update({ targetInfoId: savedTargetInfoId })
          }
        })
        success++
      } catch (err) {
        console.log('Save targetInfo error: ', err)
      }
    }
    console.log('Migrated successfully:', success, 'targets to TargetInfos table')
    console.log('Failed: ', targets.length - success, 'targets')
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('TargetInfos')
  },
}
