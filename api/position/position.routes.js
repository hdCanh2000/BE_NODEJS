const express = require('express');
const auth = require('../../middleware/auth');
const positionController = require('./position.controller');

const router = express.Router();

router.get('/', auth('admin'), positionController.getAllPosition);
router.get('/:id', auth('admin'), positionController.getPositionDetail);
router.post('/', auth('admin'), positionController.addPosition);
router.put('/:id', auth('admin'), positionController.updatePosition);

module.exports = router;
