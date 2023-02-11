const express = require('express');
const auth = require('../../middleware/auth');
const keysController = require('./keys.controller');
const router = express.Router();

router.get('/',auth(['admin', 'user', 'manager']), keysController.getAllReportByDepartmentId);

module.exports = router;