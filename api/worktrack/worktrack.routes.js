const express = require('express');
const auth = require('../../middleware/auth');
const worktrackController = require('./worktrack.controller');

const router = express.Router();

router.get('/', auth(['admin', 'manager', 'user']), worktrackController.getAll);
router.get('/:id', auth(['admin', 'manager', 'user']), worktrackController.getById);
router.get('/user/:user_id', auth(['admin', 'manager', 'user']), worktrackController.getAllByUserId);
router.post('/', auth(['admin', 'manager', 'user']), worktrackController.addKpiNormForUser);
router.put('/:id', auth(['admin', 'manager', 'user']), worktrackController.updateById);
router.delete('/:id', auth(['admin', 'manager', 'user']), worktrackController.deleteById);

module.exports = router;
