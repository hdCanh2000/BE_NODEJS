const express = require('express');
const departmentRoutes = require('./api/department/department.routes');
const authRoutes = require('./api/auth/auth.routes');
const userRoutes = require('./api/user/user.routes');
const unitRoutes = require('./api/unit/unit.routes');
const missionRouters = require('./api/misson/mission.routes');

const router = express.Router();

router.use('/departments', departmentRoutes);
router.use('/users', userRoutes);
router.use('/auth', authRoutes);
router.use('/unit', unitRoutes);
router.use('/mission', missionRouters);

module.exports = router;
