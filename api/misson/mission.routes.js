const express = require('express');
const auth = require('../../middleware/auth');
const missionController = require('./mission.controllers');

const router = express.Router();

router.post('/', auth('admin'), missionController.addMission);
router.get('/', auth(['admin', 'manager']), missionController.getMission);
router.put('/:id', auth(['admin', 'manager']), missionController.updateMission);

module.exports = router;
