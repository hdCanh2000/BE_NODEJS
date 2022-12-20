const express = require('express')
const auth = require('../../middleware/auth')
const targetController = require('./target.controller')

const router = express.Router()

router.get('/', targetController.getTarget)
router.post('/upload', auth(['admin', 'user', 'manager']), targetController.upload)
router.post('/target_logs', auth(['admin', 'user', 'manager']), targetController.createOrUpdateTargetLog)
router.delete('/:id', auth(['admin', 'manager']), targetController.deleteTarget)
router.post('/', targetController.createTarget)
module.exports = router
