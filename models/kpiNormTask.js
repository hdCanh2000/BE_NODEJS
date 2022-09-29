const { Sequelize, DataTypes } = require("sequelize");
const db = require('../config/database')
const { kpiNormModel, taskModel } = require("./index.js");

const kpiNormTask = db.define('kpiNormTask', {
    kpiNorm_id: {
        type: DataTypes.INTEGER,
    },
    task_id: {
        type: DataTypes.INTEGER
    }
});

kpiNormModel.belongsToMany(taskModel, { through: kpiNormTask });
taskModel.belongsToMany(kpiNormModel, { through: kpiNormTask });

module.exports = kpiNormTask;
