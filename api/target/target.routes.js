const express = require('express')
const auth = require('../../middleware/auth')
const targetController = require('./target.controller')

const router = express.Router()

router.get('/', targetController.getTarget)
router.get('/export', auth(['admin', 'manager']), targetController.exportTarget)
router.post('/upload', auth(['admin', 'user', 'manager']), targetController.upload)
router.post('/target_logs', auth(['admin', 'user', 'manager']), targetController.createOrUpdateTargetLog)
router.delete('/:id', auth(['admin', 'manager']), targetController.deleteTarget)
router.post('/', auth(['admin']), targetController.createTarget)
router.put('/:id', auth(['admin', 'manager']), targetController.updateTarget)
router.delete('/target_logs/:id', auth(['admin', 'manager']), targetController.deleteTargetLog)
module.exports = router
