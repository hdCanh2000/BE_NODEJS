const express = require('express');
const auth = require('../../middleware/auth');
const keyRecordController = require('./keyRecord.controller');
const router = express.Router();

router.get('/:targetLogId', auth(['admin', 'manager', 'user']), keyRecordController.getAllByTargetLogId);
router.post('/', auth(['admin', 'manager', 'user']), keyRecordController.addRecord);

module.exports = router;
