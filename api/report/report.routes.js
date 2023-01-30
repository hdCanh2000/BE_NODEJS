const express = require('express')
const auth = require('../../middleware/auth')
const reportController = require('./report.controller')

const router = express.Router()

router.get('/', reportController.findReport)
router.post('/', auth(['admin']), reportController.createReport)
module.exports = router
