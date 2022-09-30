const express = require('express');
const auth = require('../../middleware/auth');
const userController = require('./unit.controllers');

const router = express.Router();

router.post('/', auth('admin'), userController.addUnit);
router.put('/', auth('admin'), userController.updateUnit);
router.delete('/', auth('admin'), userController.deleteUnit);
router.get('/', auth('admin'), userController.getAllUnit);

module.exports = router;
