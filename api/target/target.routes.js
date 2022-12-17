const express = require('express');
const auth = require('../../middleware/auth');
const targetController = require('./target.controller');

const router = express.Router();

router.get('/', targetController.getTarget);

module.exports = router;
