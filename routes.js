const express = require('express');
const departmentRoutes = require('./api/department/department.routes');
const authRoutes = require('./api/auth/auth.routes');
const userRoutes = require('./api/user/user.routes');
const positionLevelRouter = require('./api/positionLevel/positionLevel.routes');
const unitRoutes = require('./api/unit/unit.routes');
const missionRouters = require('./api/misson/mission.routes');
const worktrackRoutes = require('./api/worktrack/worktrack.routes');
const worktrackLogRoutes = require('./api/worktrackLog/worktrackLog.routes');
const kpiNormRoutes = require('./api/kpiNorm/kpiNorm.routes');

const router = express.Router();

router.use('/departments', departmentRoutes);
router.use('/users', userRoutes);
router.use('/auth', authRoutes);
router.use('/positionLevels', positionLevelRouter);
router.use('/unit', unitRoutes);
router.use('/mission', missionRouters);
router.use('/worktracks', worktrackRoutes);
router.use('/worktrackLogs', worktrackLogRoutes);
router.use('/kpiNorms', kpiNormRoutes);

module.exports = router;
