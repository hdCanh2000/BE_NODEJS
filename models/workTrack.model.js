const { DataTypes } = require('sequelize');
const db = require('../config/database');
const { userModel, kpiNormModel, missionModel } = require('./index');

const workTracks = db.define('workTracks', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    kpiNorm_id: {
        type: DataTypes.INTEGER,
    },
    parent_id: {
        type: DataTypes.INTEGER,
    },
    mission_id: {
        type: DataTypes.INTEGER,
    },
    quantity: {
        type: DataTypes.INTEGER,
    },
    user_id: {
        type: DataTypes.INTEGER,
    },
    priority: {
        type: DataTypes.INTEGER,
    },
    review: {
        type: DataTypes.TEXT,
    },
    note: {
        type: DataTypes.TEXT,
    },
    description: {
        type: DataTypes.TEXT,
    },
    deadline: {
        type: DataTypes.DATE,
    },
    startDate: {
        type: DataTypes.DATE,
    },
});

userModel.hasMany(workTracks, {
    targetKey: 'id',
    foreignKey: 'user_id',
});

kpiNormModel.hasMany(workTracks, {
    targetKey: 'id',
    foreignKey: 'kpiNorm_id',
});

missionModel.hasMany(workTracks, {
    targetKey: 'id',
    foreignKey: 'mission_id',
});

workTracks.belongsTo(userModel, { foreignKey: 'user_id', targetKey: 'id' });
workTracks.belongsTo(kpiNormModel, { foreignKey: 'kpiNorm_id', targetKey: 'id' });
workTracks.belongsTo(missionModel, { foreignKey: 'mission_id', targetKey: 'id' });

module.exports = workTracks;
