const express = require('express');
const auth = require('../../middleware/auth');
const missionController = require('./mission.controllers');

const router = express.Router();

router.post('/', auth(['admin', 'manager']), missionController.addMission);
router.get('/', auth(['admin', 'manager']), missionController.getMission);
router.get('/:id', auth(['admin', 'manager']), missionController.getDetailMission);
router.put('/:id', auth(['admin', 'manager']), missionController.updateMission);

module.exports = router;
