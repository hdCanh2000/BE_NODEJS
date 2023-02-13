const express = require('express');
const auth = require('../../middleware/auth');
const keyRecordController = require('./keyRecord.controller');
const router = express.Router();

router.get('/:keyReportId', auth(['admin', 'manager', 'user']), keyRecordController.getAllByReportId);

module.exports = router;
