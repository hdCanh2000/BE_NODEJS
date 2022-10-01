const express = require('express');
const worktrackController = require('./worktrack.controller');

const router = express.Router();

router.get('/', worktrackController.getAll);
router.get('/:id', worktrackController.getById);
router.get('/user/:user_id', worktrackController.getAllByUserId);
router.post('/', worktrackController.create);
router.put('/:id', worktrackController.updateById);
router.delete('/:id', worktrackController.deleteById);

module.exports = router;
