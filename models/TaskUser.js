const { Sequelize, DataTypes } = require("sequelize");
const db = require('../config/database')
const { taskModel, userModel } = require("./Index.js");

const userTask = db.define('userTask', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
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
