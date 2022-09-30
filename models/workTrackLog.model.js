const { DataTypes } = require('sequelize');
const db = require('../config/database');
const { workTrackModel } = require('./index');

const workTrackLogs = db.define('workTrackLogs', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    status: {
        type: DataTypes.ENUM(['inProgress', 'completed', 'expired']),
        defaultValue: 'inProgress',
    },
    date: {
        type: DataTypes.DATE,
    },
    note: {
        type: DataTypes.TEXT,
    },
    workTrack_id: {
        type: DataTypes.INTEGER,
    },
});

workTrackModel.hasMany(workTrackLogs, {
    targetKey: 'id',
    foreignKey: 'workTrack_id',
  });
workTrackLogs.belongsTo(workTrackModel, { foreignKey: 'workTrack_id', targetKey: 'id' });

module.exports = workTrackLogs;
