const express = require('express');
const auth = require('../../middleware/auth');
const kpiNormController = require('./kpiNorm.controller');

const router = express.Router();

router.post('/', kpiNormController.addKpiNorm);
router.get('/', auth('admin'), kpiNormController.getAllKpiNorm);
router.get('/:id', auth('admin'), kpiNormController.getKpiNormDetail);
router.put('/:id', auth('admin'), kpiNormController.updateKpiNorm);

module.exports = router;
