const ApiError = require('../../utils/ApiError')
const dailyWorkServices = require('./dailyWork.service')
const uploadFile = require('../../middleware/upload')

exports.getDailyWork = async (req, res) => {
  try {
    const dailyWorks = await dailyWorkServices.searchDailyWorks(req.query)
    res.send(dailyWorks)
  } catch (err) {
    res.status(500).send(err)
  }
}


exports.createOrUpdateDailyWorkLog = async (req, res) => {
  try {
    const user = req.user
    const userRole = user.role
    const { note, status, dailyWorkId, files, id, reportDate, noticedDate, noticedStatus, quantity } = req.body
    const isCreatNoticed = noticedDate
    if (isCreatNoticed && !['admin', 'manager'].includes(userRole)) {
      throw new ApiError('You must be logged in with Admin or Manager permission to create notice.', 403)
    }
    if (isCreatNoticed) {
      const targetLog = await dailyWorkServices.createOrUpdateDailyWorkLogs({
        note,
        status,
        dailyWorkId,
        files,
        id,
        reportDate,
        noticedDate,
        noticedStatus,
        quantity,
      })
      return res.status(200).send(targetLog)
    }
    if (!note || !status || !dailyWorkId || !quantity) {
      return res.status(400).send({ message: 'Missing required fields' })
    }
    if (!noticedDate && !reportDate) {
      return res.status(400).send({ message: 'Missing required report or notice date' })
    }
    const dailyWork = await dailyWorkServices.getDailyWorkById(dailyWorkId)
    if (!dailyWork) {
      return res.status(404).send({ message: 'daily work not found' })
    }
    if (userRole === 'user' && dailyWork.userId !== user.id) {
      return res.status(403).send({ message: 'Forbidden' })
    }

    const targetLog = await dailyWorkServices.createOrUpdateDailyWorkLogs({
      note,
      status,
      dailyWorkId,
      files,
      id,
      reportDate,
      noticedDate,
      noticedStatus,
      quantity,
    })
    return res.send(targetLog)
  } catch (err) {
    res.status(500).send({
      message: `Internal server error: ${err}`,
    })
  }
}

exports.deleteDailyWork = async (req, res) => {
  try {
    const id = req.params.id
    await dailyWorkServices.deleteDailyWork(id)
    res.status(200).send({ message: 'Delete target successfully' })
  } catch (err) {
    res.status(500).send({
      message: `Internal server error: ${err}`,
    })
  }
}

exports.createDailyWork = async (req, res) => {
  try {
    const data = req.body
    const { name, unitId, monthKey } = data
    if (!name || !unitId || !monthKey) {
      return res.status(400).send({ message: 'Missing required fields' })
    }
    data.status = 'inProgress'
    const result = await dailyWorkServices.createDailyWork(data)
    res.status(200).send(result)
  } catch (err) {
    res.status(500).send({
      message: `Internal server error: ${err}`,
    })
  }
}

exports.updateDailyWork = async (req, res) => {
  const id = req.params.id
  const data = req.body
  try {
    const resp = await dailyWorkServices.updateDailyWork(id, data)
    return res.status(200).send(resp)
  } catch (err) {
    res.status(500).send({
      message: `Internal server error: ${err}`,
    })
  }
}
