const express = require ("express");
const departmentController = require ("./departmentController");
const auth = require ("../../middleware/auth");

const router = express.Router();

router.get('/', auth("admin"),departmentController.getAllDepartment);
router.get('/:id', auth("admin"), departmentController.getDepartmentDetail);
router.post('/', auth("admin"), departmentController.addDepartment);
router.put('/:id', auth("admin"), departmentController.updateDepartment);

module.exports = router;
