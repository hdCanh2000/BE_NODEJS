const express = require('express');
const auth = require('../../middleware/auth');
const departmentController = require('./department.controller');

const router = express.Router();

router.get('/', auth('admin'), departmentController.getAllDepartment);
router.get('/:id', auth('admin'), departmentController.getDepartmentDetail);
router.post('/', auth('admin'), departmentController.addDepartment);
router.put('/', auth('admin'), departmentController.updateDepartment);

module.exports = router;
