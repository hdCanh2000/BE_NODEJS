const express = require('express');
const auth = require('../../middleware/auth');
const worktrackController = require('./worktrack.controller');

const router = express.Router();

router.get('/', auth(['admin', 'manager', 'user']), worktrackController.getAll);
router.get('/workTrackMe', auth(['admin', 'manager', 'user']), worktrackController.getWorkTrackOfMe);
router.get('/user/:user_id', auth(['admin', 'manager', 'user']), worktrackController.getAllByUserId);
router.get('/kpi_user/:kpiNorm_id/:user_id', auth(['admin', 'manager', 'user']), worktrackController.getByKpiNornAndUserId);
router.get('/workTrackPending', auth(['admin', 'manager', 'user']), worktrackController.getWorkTrackByStatus);
router.get('/workTrackReport', auth(['admin', 'manager', 'user']), worktrackController.reportWorktrack);
router.get('/workTrackReportAll', auth(['admin', 'manager', 'user']), worktrackController.reportWorktrackAll);
router.post('/', auth(['admin', 'manager', 'user']), worktrackController.addWorkTrack);
router.get('/:id', auth(['admin', 'manager', 'user']), worktrackController.getById);
router.put('/:id', auth(['admin', 'manager', 'user']), worktrackController.updateWorkTrackById);
router.patch('/:id', auth(['admin', 'manager', 'user']), worktrackController.updateStatusWorkTrackById);
router.delete('/:id', auth(['admin', 'manager', 'user']), worktrackController.deleteById);

module.exports = router;
