const { DataTypes } = require('sequelize');
const db = require('../config/database');
const { missionModel, keyModel } = require('./index');

const keyMission = db.define('keyMission', {
    compare: {
        type: DataTypes.TEXT,
    },
    value: {
        type: DataTypes.INTEGER,
    },
});

missionModel.belongsToMany(keyModel, { through: keyMission });
keyModel.belongsToMany(missionModel, { through: keyMission });

module.exports = keyMission;
