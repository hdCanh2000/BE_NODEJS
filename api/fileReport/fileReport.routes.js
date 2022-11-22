const express = require('express');
const fileReport = require('./fileReport.controller');
// const auth = require('../../middleware/auth');

const router = express.Router();

// router.get('/dowload', auth(['admin', 'manager', 'user']), fileReport.dowloadFile);
// router.post('/upload/multiple', auth(['admin', 'manager', 'user']), fileReport.uploadMultiple);
// router.post('/upload', auth(['admin', 'manager', 'user']), fileReport.upload);
router.get('/download/:name', fileReport.dowloadFile);
router.post('/upload/multiple', fileReport.uploadMultiple);
router.post('/upload', fileReport.upload);
router.get('/list', fileReport.getListFiles);
router.delete('/delete/:name', fileReport.deleteFile);

module.exports = router;
