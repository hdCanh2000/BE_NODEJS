const express = require('express');
const auth = require('../../middleware/auth');
const worktrackController = require('./worktrack.controller');

const router = express.Router();

router.get('/', auth(['admin', 'manager', 'user']), worktrackController.getAll);
router.get('/workTrackMe', auth(['admin', 'manager', 'user']), worktrackController.getWorkTrackOfMe);
router.get('/user/:user_id', auth(['admin', 'manager', 'user']), worktrackController.getAllByUserId);
router.get('/:id', auth(['admin', 'manager', 'user']), worktrackController.getById);
router.post('/', auth(['admin', 'manager', 'user']), worktrackController.addKpiNormForUser);
router.put('/:id', auth(['admin', 'manager', 'user']), worktrackController.updateWorkTrackById);
router.delete('/:id', auth(['admin', 'manager', 'user']), worktrackController.deleteById);
router.get('/workTrackPending', auth(['admin', 'manager', 'user']), worktrackController.getWorkTrackByStatus);

module.exports = router;
