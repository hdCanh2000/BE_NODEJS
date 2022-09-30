const express = require('express');
const auth = require('../../middleware/auth');
const missionController = require('./mission.controllers');

const router = express.Router();

router.post('/', auth('admin'), missionController.addUnit);

module.exports = router;
