const { Sequelize, DataTypes } = require("sequelize");
const db = require('../config/database')
const { missionModel, keyModel } = require("./index.js");

const keyMission = db.define('keyMission', {
    key_id: {
        type: DataTypes.INTEGER,
    },
    mission_id: {
        type: DataTypes.INTEGER
    },
    compare: {
        type: DataTypes.TEXT
    },
    value: {
        type: DataTypes.INTEGER
    }
});

missionModel.belongsToMany(keyModel, { through: keyMission });
keyModel.belongsToMany(missionModel, { through: keyMission });

module.exports = keyMission;
