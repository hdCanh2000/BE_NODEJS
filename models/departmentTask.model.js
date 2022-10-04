const { DataTypes } = require('sequelize');
const db = require('../config/database');
const { taskModel, departmentModel } = require('./index');

const taskDepartment = db.define('taskDepartment', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    isResponsible: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
});

taskModel.belongsToMany(departmentModel, { through: taskDepartment });
departmentModel.belongsToMany(taskModel, { through: taskDepartment });

module.exports = taskDepartment;
