const ApiError = require('../../utils/ApiError')
const targetService = require('./target.service')
const uploadFile = require('../../middleware/upload')
const dailyWorkServices = require('../dailyWork/dailyWork.service')

exports.getTarget = async (req, res) => {
  const { status, departmentId, userId } = req.query
  try {
    const targets = await targetService.searchTargets(req.query)

    res.status(200).send(targets)
  } catch (err) {
    console.log(err)
    res.status(500).send(err)
  }
}

exports.upload = async (req, res) => {
  try {
    await uploadFile(req, res)
    if (req.files === undefined) {
      return res.status(400).send({ message: 'Please upload a file!' })
    }
    const host = req.get('host') || 'dwtapi.doppelherz.vn'
    const staticPath = 'uploads'
    const protocol = req.protocol || 'http'
    const dataFiles = req.files ? req.files.map(file => `${protocol}://${host}/${staticPath}/${file.filename}`) : []
    res.status(200).json({
      message: 'Uploaded the file successfully',
      data: dataFiles,
    })
  } catch (error) {
    res.status(500).send({
      message: `Could not upload the file: ${error}`,
    })
  }
}

exports.createOrUpdateTargetLog = async (req, res) => {
  try {
    const user = req.user
    const userRole = user.role
    const { note, status, targetId, files, id, reportDate, noticedDate, noticedStatus, quantity } = req.body
    const isCreatNoticed = noticedDate
    if (isCreatNoticed && !['admin', 'manager'].includes(userRole)) {
      throw new ApiError('You must be logged in with Admin or Manager permission to create notice.', 403)
    }
    if (isCreatNoticed) {
      const targetLog = await targetService.createOrUpdateTargetLog({
        note,
        status,
        targetId,
        files,
        id,
        reportDate,
        noticedDate,
        noticedStatus,
        quantity,
      })
      return res.status(200).send(targetLog)
    }
    if (!note || !status || !targetId || !quantity) {
      return res.status(400).send({ message: 'Missing required fields' })
    }
    if (!noticedDate && !reportDate) {
      return res.status(400).send({ message: 'Missing required report or notice date' })
    }
    const target = await targetService.getTargetById(targetId)
    if (!target) {
      return res.status(404).send({ message: 'Target not found' })
    }
    if (userRole === 'user' && target.userId !== user.id) {
      return res.status(403).send({ message: 'Forbidden' })
    }

    const targetLog = await targetService.createOrUpdateTargetLog({
      note,
      status,
      targetId,
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

exports.deleteTargetLog = async (req, res) => {
  try {
    // only allow admin or manager to delete
    const user = req.user
    const userRole = user.role
    if (!['admin', 'manager'].includes(userRole)) {
      throw new ApiError('You must be logged in with Admin or Manager permission to delete target log.', 403)
    }
    const id = req.params.id
    await targetService.deleteTargetLog(id)
    res.status(200).send({ message: 'Delete target log successfully' })
  } catch (err) {
    res.status(500).send({
      message: `Internal server error: ${err}`,
    })
  }
}

exports.deleteTarget = async (req, res) => {
  try {
    const id = req.params.id
    await targetService.deleteTarget(id)
    res.status(200).send({ message: 'Delete target successfully' })
  } catch (err) {
    res.status(500).send({
      message: `Internal server error: ${err}`,
    })
  }
}

exports.createTarget = async (req, res) => {
  try {
    const data = req.body
    const { quantity } = data
    if (!quantity) {
      return res.status(400).send({ message: 'Missing required fields' })
    }
    data.status = 'inProgress'
    const target = await targetService.createTarget(data)
    res.status(200).send(target)
  } catch (err) {
    console.log(err)
    res.status(500).send({
      message: `Internal server error: ${err}`,
    })
  }
}

exports.updateTarget = async (req, res) => {
  const id = req.params.id
  const data = req.body
  try {
    const resp = await targetService.updateTarget(id, data)
    return res.status(200).send(resp)
  } catch (err) {
    res.status(500).send({
      message: `Internal server error: ${err}`,
    })
  }
}

exports.exportTarget = async (req, res) => {
  const targets = await targetService.searchTargets(req.query)
  const dailyWorks = await dailyWorkServices.searchDailyWorks(req.query)
  return res.status(200).send({
    targets,
    dailyWorks,
  })
}
