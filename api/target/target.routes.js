const express = require('express')
const auth = require('../../middleware/auth')
const targetController = require('./target.controller')

const router = express.Router()

router.get('/', targetController.getTarget)
router.post('/upload', auth(['admin', 'user', 'manager']), targetController.upload)
router.post('/target_logs', auth(['admin', 'user', 'manager']), targetController.createOrUpdateTargetLog)

module.exports = router
