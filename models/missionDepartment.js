const { Sequelize, DataTypes } = require("sequelize");
const db = require('../config/database')
const { missionModel, departmentModel } = require("./index.js");

const missionDepartment = db.define('missionDepartment', {
    department_id: {
        type: DataTypes.INTEGER,
    },
    mission_id: {
        type: DataTypes.INTEGER
    },
    isResponsible: {
        type: DataTypes.BOOLEAN
    }
});

missionModel.belongsToMany(departmentModel, { through: missionDepartment });
departmentModel.belongsToMany(missionModel, { through: missionDepartment });

module.exports = missionDepartment;
