const { DataTypes } = require('sequelize');
const db = require('../config/database');
const { workTrackModel, kpiNormModel } = require('./index');

const workTrackKpiNorms = db.define('workTrackKpiNorm', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    worktrack_id: {
        type: DataTypes.INTEGER,
    },
    kpiNorm_id: {
        type: DataTypes.INTEGER,
    },
    parent_id: {
        type: DataTypes.INTEGER,
    },
    quantity: {
        type: DataTypes.INTEGER,
    },
});

workTrackModel.hasMany(workTrackKpiNorms, {
    targetKey: 'id',
    foreignKey: 'worktrack_id',
});

kpiNormModel.hasMany(workTrackKpiNorms, {
    targetKey: 'id',
    foreignKey: 'kpiNorm_id',
});

workTrackKpiNorms.belongsTo(workTrackModel, { foreignKey: 'worktrack_id', targetKey: 'id' });
workTrackKpiNorms.belongsTo(kpiNormModel, { foreignKey: 'kpiNorm_id', targetKey: 'id' });

module.exports = workTrackKpiNorms;
