const { Sequelize, DataTypes } = require("sequelize");
const db = require('../config/database')
const { taskModel, departmentModel } = require("./index.js");

const taskDepartment = db.define('taskDepartment', {
    department_id: {
        type: DataTypes.INTEGER,
    },
    task_id: {
        type: DataTypes.INTEGER
    },
    isResponsible: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
});

taskModel.belongsToMany(departmentModel, { through: taskDepartment });
departmentModel.belongsToMany(taskModel, { through: taskDepartment });

module.exports = taskDepartment;
