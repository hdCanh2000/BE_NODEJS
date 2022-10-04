const { DataTypes } = require('sequelize');
const db = require('../config/database');
const { taskModel, userModel } = require('./index');

const userTask = db.define('userTask', {
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

userModel.belongsToMany(taskModel, { through: userTask });
taskModel.belongsToMany(userModel, { through: userTask });

module.exports = userTask;
