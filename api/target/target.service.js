const model = require('../../models/index')
const { Op } = require('sequelize')
const sequelize = require('sequelize')
const userDTO = ['id', 'email', 'role', 'name', 'sex', 'dateOfBirth', 'dateOfJoin', 'address', 'phone', 'createdAt', 'updatedAt', 'isDelete']
const searchTargets = async query => {
  const { userId, start, end, q } = query
  const conditions = []
  if (userId) {
    conditions.push({ userId })
  }
  if (start && end) {
    conditions.push({ createdAt: { [Op.between]: [start, end] } })
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
    ],
    where: conditions,
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

module.exports = {
  searchTargets,
  getTargetById,
  createOrUpdateTargetLog,
}
