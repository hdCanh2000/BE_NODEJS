const ApiError = require('../../utils/ApiError')
const targetService = require('./target.service')
const uploadFile = require('../../middleware/upload')
const dailyWorkServices = require('../dailyWork/dailyWork.service')
const ExcelJs = require('exceljs')
const moment = require('moment')
const userServices = require('../user/user.service')
const departmentService = require('../department/department.service')
const fetch = require('node-fetch')
const { readFileSync } = require('fs')
const fs = require('fs')
const FormData = require('form-data')
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
  try {
    if (!req.query.start || !req.query.end) {
      return res.status(400).send(new ApiError('Missing start and end date', 400))
    }
    const targets = await targetService.searchTargets(req.query)
    const dailyWorks = await dailyWorkServices.searchDailyWorks(req.query)
    //get user
    let userName = ''
    let position = ''
    if (req.query.userId) {
      const user = await userServices.findUser(req.query.userId)
      userName = user?.name || ''
      position = user?.position?.name || ''
    }
    if (req.query.departmentId) {
      const dpm = await departmentService.detailDepartment(req.query.departmentId)
      position = dpm.name
    }

    const workbook = new ExcelJs.Workbook()
    const sample = await workbook.xlsx.readFile('./resources/static/files/DWT_export_sample.xlsx')
    const sheet = sample.getWorksheet(2)
    //insert calendar base on start date and end date
    const start = moment(req.query.start, 'MM-DD-YYYY')
    const month = start.month()
    //fill user, position and month to worksheet
    sheet.getCell('D2').value = 'Vị trí: ' + position
    sheet.getCell('AI1').value = userName
    sheet.getCell('AI2').value = month + 1
    const calendarStartCol = 10
    for (let i = 0; i < start.daysInMonth(); i++) {
      const currentCalenderDay = moment(`${month + 1}-${i + 1}-${start.year()}`, 'MM-D-YYYY').locale('vi')
      const calenderText = currentCalenderDay.format('D dd')

      const calenderCell = sheet.getRow(5).getCell(i + calendarStartCol)
      // set background color for weekend
      if (currentCalenderDay.day() === 0) {
        calenderCell.style = {
          ...calenderCell.style,
          fill: { ...calenderCell.fill, fgColor: { argb: '00ff9f9f' } },
        }
      }
      if (currentCalenderDay.day() === 6) {
        calenderCell.style = {
          ...calenderCell.style,
          fill: { ...calenderCell.fill, fgColor: { argb: '00fff2cc' } },
        }
      }
      calenderCell.value = calenderText
    }
    //start insert target data from 6th row
    const targetsStartInsertRow = 6
    //reverse target to insert from bottom to top
    const reversedTargets = targets.reverse()
    let currentRowCursor = targetsStartInsertRow
    let totalManDayEstimate = 0
    reversedTargets.forEach((target, index) => {
      //insert then fill then insert at same position => fill data reversely
      const insertedRow = sheet.insertRow(targetsStartInsertRow, null, 'i+')
      const row = insertedRow.number
      fillCell(sheet, `A${row}`, reversedTargets.length - index, 'ffffffff')
      fillCell(sheet, `B${row}`, target.name ?? '', 'ffffffff')
      fillCell(sheet, `C${row}`, '-', 'ffffffff')
      fillCell(sheet, `D${row}`, target.deadline ? moment(target.deadline).format('DD/MM/YYYY') : '', 'ffffffff')
      fillCell(sheet, `E${row}`, target.quantity ?? '', 'ffffffff')
      fillCell(sheet, `F${row}`, target?.unit?.name ?? '', 'ffffffff')
      fillCell(sheet, `G${row}`, target.manDay ?? '', 'ffffffff')
      // calculate manday estimate
      let manDayEstimate = 0
      let totalCompletedTasks = 0
      target.TargetLogs.forEach(log => {
        if (log.status === 'completed') {
          totalCompletedTasks += log.quantity
        }
      })
      manDayEstimate = totalCompletedTasks * (target.manDay ?? 1)
      totalManDayEstimate += manDayEstimate
      fillCell(sheet, `H${row}`, manDayEstimate, 'ffffffff')
      fillCell(sheet, `I${row}`, '-', 'ffffffff')
      //ínsert target log into current row
      const targetLogs = target.TargetLogs
      targetLogs.forEach((log, index) => {
        const logDay = log.reportDate ? moment(log.reportDate, 'YYYY-MM-DD').date() : moment(log.noticedDate, 'YYYY-MM-DD').date()
        const logDayCalendarCell = sheet.getRow(row).getCell(logDay + calendarStartCol - 1)
        const completedColor = '0005a34a'
        const workingColor = '006571ff'
        const isCompleted = log.status === 'completed'
        const isWarning = !!log.noticedStatus
        if (isCompleted) {
          logDayCalendarCell.style = {
            ...logDayCalendarCell.style,
            fill: { ...logDayCalendarCell.fill, fgColor: { argb: completedColor } },
          }
          logDayCalendarCell.value = log.quantity
        } else if (isWarning && !isCompleted) {
          logDayCalendarCell.style = {
            ...logDayCalendarCell.style,
            fill: { ...logDayCalendarCell.fill, fgColor: { argb: workingColor } },
          }
          logDayCalendarCell.value = `! ${log.quantity ?? 0}`
        } else {
          logDayCalendarCell.value = log.quantity
        }
      })
      currentRowCursor++
    })
    // insert total estimated manday
    fillCell(sheet, `H${currentRowCursor}`, totalManDayEstimate, '00e2f0d9')
    const timeStamp = new Date().getTime()
    const fileName = './resources/static/files/' + `${timeStamp}_dwt_thang_${month + 1}.xlsx`
    await workbook.xlsx.writeFile(fileName)
    //chmod file before send to avoid htaccess
    /*
     * The number 777 in octal notation is the number 511 in decimal notation.
     * fs.chmod(path, 0777) and fs.chmod(path, 511) do the same thing,
     * but fs.chmod(path, 777) does not.
     * https://stackoverflow.com/questions/20769023/using-nodejs-chmod-777-and-0777
     * */
    fs.chmodSync(fileName, 0o777)
    const uploadUrl = 'https://report.sweetsica.com/api/report/upload'
    const formData = new FormData()
    formData.append('files', fs.createReadStream(fileName))
    if (req.query.userId) {
      formData.append('userId', req.query.userId)
    }
    const uploadRes = await fetch(uploadUrl, {
      method: 'POST',
      body: formData,
    })
    if (!uploadRes.ok) {
      throw new Error('Upload file failed')
    }
    const uploadResJson = await uploadRes.json()
    //delete file after upload
    await fs.unlinkSync(fileName)
    return res.status(200).send(uploadResJson)
  } catch (err) {
    console.log(err)
    res.status(500).send({
      message: `Internal server error: ${err}`,
    })
  }
}

function fillCell(sheet, cellIndex, value, color) {
  const cell = sheet.getCell(cellIndex)
  cell.value = value
  //set color
  cell.style = {
    ...cell.style,
    fill: { ...cell.fill, fgColor: { argb: color } },
    font: { ...cell.font, bold: false },
  }
}
