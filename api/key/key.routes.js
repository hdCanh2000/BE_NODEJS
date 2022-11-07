const express = require('express');
const key = require('./key.controller');
const auth = require('../../middleware/auth');

const router = express.Router();

router.get('/', auth(['admin', 'manager', 'user']), key.getAll);
router.get('/:id', auth(['admin', 'manager', 'user']), key.getById);
router.post('/', auth(['admin', 'manager']), key.create);
router.put('/:id', auth(['admin', 'manager']), key.updateById);
router.delete('/:id', auth(['admin', 'manager']), key.deleteById);

module.exports = router;
