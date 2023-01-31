const express = require('express')
const auth = require('../../middleware/auth')
const uploadController = require('./upload.controller')

const router = express.Router()
router.post('/', auth(['user', 'admin', 'manager']), uploadController.uploadFile);
module.exports = router
