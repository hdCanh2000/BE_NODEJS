const model = require('../../models/index')
const { Op } = require('sequelize')
const sequelize = require('sequelize')
const userDTO = ['id', 'email', 'role', 'name', 'sex', 'dateOfBirth', 'dateOfJoin', 'address', 'phone', 'createdAt', 'updatedAt', 'isDelete']
const searchTargets = async query => {
  const { userId, start, end, q, status, departmentId } = query
  //deleted is null
  const conditions = []
  conditions.push({ deletedAt: { [Op.is]: null } })
  if (status) {
    if (status === 'assigned') {
      conditions.push({ userId: { [Op.not]: null } })
    } else if (status === 'unassigned') {
      conditions.push({ userId: { [Op.is]: null } })
    }
  }
  if (userId) {
    conditions.push({ userId })
  }
  if (start && end) {
    conditions.push({ createdAt: { [Op.between]: [`${start} 00:00:01`, `${end} 23:59:59`] } })
  }
  if (departmentId) {
    //find list positionId by departmentId
    const positions = await model.positions.findAll({ where: { department_id: departmentId } })
    const positionIds = positions.map(position => position.id)
    conditions.push({ positionId: { [Op.in]: positionIds } })
  }
  //search by matching name and description
  if (q) {
    conditions.push({
      [Op.or]: [
        sequelize.where(sequelize.fn('LOWER', sequelize.col('Target.name')), 'LIKE', `%${q}%`),
        sequelize.where(sequelize.fn('LOWER', sequelize.col('Target.description')), 'LIKE', `%${q}%`),
      ],
    })
  }

  const targets = await model.Target.findAll({
    include: [
      {
        model: model.users,
        attributes: userDTO,
        include: [
          {
            model: model.departments,
          },
          {
            model: model.positions,
          },
        ],
      },
      {
        model: model.TargetLog,
      },
      {
        model: model.units,
      },
      {
        model: model.positions,
        include: [
          {
            model: model.departments,
          },
        ],
      },
    ],
    where: conditions,
    //sort
    order: [['createdAt', 'DESC']],
  })
  return targets
}
const getTargetById = async targetId => {
  const target = await model.Target.findOne({
    include: [
      {
        model: model.users,
        attributes: userDTO,
        include: [
          {
            model: model.departments,
          },
          {
            model: model.positions,
          },
        ],
      },
      {
        model: model.TargetLog,
      },
      {
        model: model.units,
      },
    ],
    where: { id: targetId },
  })
  return target
}
const createOrUpdateTargetLog = async data => {
  const { id = -1, note, status, targetId, files, reportDate, noticedDate, noticedStatus, quantity } = data
  const targetLog = await model.TargetLog.findOne({ where: { id } })
  if (!targetLog) {
    const targetLog = await model.TargetLog.create({
      note,
      status,
      targetId,
      files,
      reportDate,
      noticedDate,
      noticedStatus,
      quantity,
    })
    return targetLog
  }
  const targetLogUpdated = await targetLog.update({
    note,
    status,
    targetId,
    files,
    reportDate,
    noticedDate,
    noticedStatus,
    quantity,
  })
  return targetLogUpdated
}

const deleteTarget = async id => {
  const target = await model.Target.findOne({ where: { id } })
  if (!target) {
    throw new Error('Target not found')
  }
  const targetDeleted = await target.update({ deletedAt: new Date() })
  return targetDeleted
}
const createTarget = async data => {
  const target = await model.Target.create(data)
  return target
}

const updateTarget = async (id, data) => {
  const target = await model.Target.findOne({ where: { id } })
  if (!target) {
    throw new Error('Target not found')
  }
  const targetUpdated = await target.update(data)
  return targetUpdated
}
const deleteTargetLog = async id => {
  //for fix old data which cause bugs still show target log after delete -> delete all logs with deletedAt != null
  await model.TargetLog.destroy({
    where: {
      deletedAt: { [Op.not]: null },
    },
  })
  const targetLog = await model.TargetLog.destroy({ where: { id } })
}

module.exports = {
  searchTargets,
  getTargetById,
  createOrUpdateTargetLog,
  deleteTarget,
  createTarget,
  updateTarget,
  deleteTargetLog,
}
