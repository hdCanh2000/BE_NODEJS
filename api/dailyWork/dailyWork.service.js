const model = require('../../models/index')
const { Op } = require('sequelize')
const sequelize = require('sequelize')
const userDTO = ['id', 'email', 'role', 'name', 'sex', 'dateOfBirth', 'dateOfJoin', 'address', 'phone', 'createdAt', 'updatedAt', 'isDelete']
const searchDailyWorks = async query => {
  const { userId, start, end, q, status } = query
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
  //search by matching name and description
  if (q) {
    conditions.push({
      [Op.or]: [sequelize.where(sequelize.fn('LOWER', sequelize.col('DailyWork.name')), 'LIKE', `%${q}%`)],
    })
  }

  const dailyWorks = await model.DailyWork.findAll({
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
        model: model.DailyWorkLog,
      },
      {
        model: model.units,
      },
    ],
    where: conditions,
    //sort
    order: [['createdAt', 'DESC']],
  })
  return dailyWorks
}
const getDailyWorkById = async id => {
  const dailyWork = await model.DailyWork.findOne({
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
        model: model.DailyWorkLog,
      },
      {
        model: model.units,
      },
    ],
    where: { id: id },
  })
  return dailyWork
}
const createOrUpdateDailyWorkLogs = async data => {
  const { id = -1, note, status, dailyWorkId, files, reportDate, noticedDate, noticedStatus, quantity } = data
  const dailyWorkLog = await model.DailyWorkLog.findOne({ where: { id } })
  if (!dailyWorkLog) {
    const dailyWorkLog = await model.DailyWorkLog.create({
      note,
      status,
      dailyWorkId,
      files,
      reportDate,
      noticedDate,
      noticedStatus,
      quantity,
    })
    return dailyWorkLog
  }
  const dailyWorkLogUpdated = await dailyWorkLog.update({
    note,
    status,
    dailyWorkId,
    files,
    reportDate,
    noticedDate,
    noticedStatus,
    quantity,
  })
  return dailyWorkLogUpdated
}

const deleteDailyWork = async id => {
  const dailyWork = await model.DailyWork.findOne({ where: { id } })
  if (!dailyWork) {
    throw new Error('daily work not found')
  }
  const deleted = await dailyWork.update({ deletedAt: new Date() })
  return deleted
}
const createDailyWork = async data => {
  const { name } = data
  //find by name
  const dailyWork = await model.DailyWork.findOne({ where: { name } })
  if (dailyWork) {
    throw new Error('daily work already exists')
  }
  const res = await model.DailyWork.create(data)
  return res
}

const updateDailyWork = async (id, data) => {
  const dailyWork = await model.DailyWork.findOne({ where: { id } })
  if (!dailyWork) {
    throw new Error('daily work not found')
  }
  const res = await dailyWork.update(data)
  return res
}

module.exports = {
  searchDailyWorks,
  getDailyWorkById,
  createOrUpdateDailyWorkLogs,
  deleteDailyWork,
  createDailyWork,
  updateDailyWork,
}
