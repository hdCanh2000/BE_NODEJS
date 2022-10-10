const express = require('express');
const worktrackKpiNormController = require('./worktrackKpiNorm.controller');

const router = express.Router();

router.get('/', worktrackKpiNormController.getAll);
router.get('/:id', worktrackKpiNormController.getById);
router.get('/worktrack/:worktrack_id', worktrackKpiNormController.getAllByWorktrackId);
router.post('/', worktrackKpiNormController.create);
router.put('/:id', worktrackKpiNormController.updateById);
router.delete('/', worktrackKpiNormController.deleteById);

module.exports = router;
