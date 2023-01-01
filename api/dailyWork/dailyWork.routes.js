const express = require('express')
const auth = require('../../middleware/auth')
const dailyWorkController = require('./dailyWork.controller')

const router = express.Router()

router.get('/', dailyWorkController.getDailyWork)
router.post('/logs', auth(['admin', 'user', 'manager']), dailyWorkController.createOrUpdateDailyWorkLog)
router.delete('/:id', auth(['admin', 'manager']), dailyWorkController.deleteDailyWork)
router.post('/', auth(['admin']), dailyWorkController.createDailyWork)
router.put('/:id', auth(['admin', 'manager']), dailyWorkController.updateDailyWork)
module.exports = router
