const { DataTypes } = require('sequelize');
const db = require('../config/database');
const { missionModel, departmentModel } = require('./index');

const missionDepartment = db.define('missionDepartment', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    isResponsible: {
        type: DataTypes.BOOLEAN,
    },
});

missionModel.belongsToMany(departmentModel, { through: missionDepartment });
departmentModel.belongsToMany(missionModel, { through: missionDepartment });

module.exports = missionDepartment;
