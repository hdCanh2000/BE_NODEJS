const express = require('express');
const auth = require('../../middleware/auth');
const keyRecordController = require('./keyRecord.controller');
const router = express.Router();

router.get('/:keyReportId', auth(['admin', 'manager', 'user']), keyRecordController.getAllByReportId);
router.post('/', auth(['admin', 'manager', 'user']), keyRecordController.addRecord);

module.exports = router;
