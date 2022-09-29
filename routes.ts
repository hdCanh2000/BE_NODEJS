const express = require('express');
const departmentRoutes = require('./api/department/routes');
const authRoutes = require('./api/auth/routes');
const userRoutes = require('./api/user/routes');

const router = express.Router();

router.use('/departments', departmentRoutes);
router.use('/users', userRoutes);
router.use('/auth', authRoutes);

module.exports = router;
