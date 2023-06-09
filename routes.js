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
const requirementRoutes = require('./api/requirement/requirement.routes');
const positionRoutes = require('./api/position/position.routes');
const taskRoutes = require('./api/task/task.routes');
const keyRoutes = require('./api/key/key.routes');
const fileReportRoutes = require('./api/fileReport/fileReport.routes');
const targetRoutes = require('./api/target/target.routes');
const reportRoutes = require('./api/report/report.routes');
const keyReportRoutes = require('./api/keys/keys.routes');
const keyRecordRoutes = require('./api/keyRecord/keyRecord.routes');

const router = express.Router();

router.use('/departments', departmentRoutes);
router.use('/users', userRoutes);
router.use('/auth', authRoutes);
router.use('/positionLevels', positionLevelRouter);
router.use('/units', unitRoutes);
router.use('/missions', missionRouters);
router.use('/worktracks', worktrackRoutes);
router.use('/worktrackLogs', worktrackLogRoutes);
router.use('/kpiNorms', kpiNormRoutes);
router.use('/requirements', requirementRoutes);
router.use('/positions', positionRoutes);
router.use('/task', taskRoutes);
router.use('/keys', keyRoutes);
router.use('/file', fileReportRoutes);
router.use('/targets', targetRoutes);
router.use('/dailyWorks', require('./api/dailyWork/dailyWork.routes'));

router.use('/reports', reportRoutes);
router.use('/upload', require('./api/upload/upload.routes'));

router.use('/keysReport', keyReportRoutes);
router.use('/keyRecords', keyRecordRoutes);
router.use('/reports', reportRoutes);
router.use('/upload', require('./api/upload/upload.routes'));

module.exports = router;
