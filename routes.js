const express = require('express');
const departmentRoutes = require('./api/department/department.routes');
const authRoutes = require('./api/auth/auth.routes');
const userRoutes = require('./api/user/user.routes');
const kpiNormRoutes = require('./api/kpiNorm/kpiNorm.routes');

const router = express.Router();

router.use('/departments', departmentRoutes);
router.use('/users', userRoutes);
router.use('/auth', authRoutes);
router.use('/kpiNorms', kpiNormRoutes);

module.exports = router;
