const { Sequelize, DataTypes } = require("sequelize");
const db = require('../config/database')
const { taskModel, userModel } = require("./index.js");

const userTask = db.define('userTask', {
    user_id: {
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

    userModel.belongsToMany(taskModel, { through: userTask });
    taskModel.belongsToMany(userModel, { through: userTask });

module.exports = userTask;
