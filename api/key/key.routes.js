const express = require('express');
const key = require('./key.controller');
const auth = require('../../middleware/auth');

const router = express.Router();

router.get('/', auth('admin'), key.getAll);
router.get('/:id', auth('admin'), key.getById);
router.post('/', auth('admin'), key.create);
router.put('/:id', auth('admin'), key.updateById);
router.delete('/:id', auth('admin'), key.deleteById);

module.exports = router;
