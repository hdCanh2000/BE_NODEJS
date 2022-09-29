const { Sequelize, DataTypes } = require("sequelize");
const db = require('../config/database');
const {unitModel, missionModel } = require("./Index.js");

const tasks = db.define('tasks', {
    task_id  : {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true
    },
    unit_id: {
        type: DataTypes.INTEGER,
    },
    description:{
        type: DataTypes.TEXT
    },
    quantity:{
        type: DataTypes.INTEGER
    },
    kpiValue: {
        type: DataTypes.INTEGER
    },
    startDate:{
        type: DataTypes.DATE
    },
    deadlineDate:{
        type: DataTypes.DATE
    },
    startTime: {
        type: DataTypes.TIME
    },
    deadlineTime:{
        type: DataTypes.TIME
    },
    manday:{
        type: DataTypes.INTEGER
    },
    status: {
        type: DataTypes.INTEGER
    },
    estimateMD:{
        type: DataTypes.INTEGER
    },
    priority:{
        type: DataTypes.INTEGER
    },
    note:{
        type: DataTypes.TEXT
    },
    mission_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

unitModel.hasMany(tasks, {
    targetKey: 'unit_id',
    foreignKey: 'unit_id',
});
tasks.belongsTo(unitModel, { foreignKey: 'unit_id', targetKey: 'unit_id' });

tasks.hasMany(missionModel, {
    targetKey: 'mission_id',
    foreignKey: 'mission_id',
});
missionModel.belongsTo(tasks, { foreignKey: 'mission_id', targetKey: 'mission_id' });


module.exports = tasks;