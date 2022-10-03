const express = require('express');
const auth = require('../../middleware/auth');
const departmentController = require('./department.controller');

const router = express.Router();

router.get('/', auth(['admin', 'manager']), departmentController.getAllDepartment);
router.get('/:id', auth('admin'), departmentController.getDepartmentDetail);
router.post('/', auth('admin'), departmentController.addDepartment);
router.put('/:id', auth('admin'), departmentController.updateDepartment);

module.exports = router;
