const { DataTypes } = require('sequelize');
const db = require('../config/database');
const { kpiNormModel, taskModel } = require('./index');

const kpiNormTask = db.define('kpiNormTask', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
});

kpiNormModel.belongsToMany(taskModel, { through: kpiNormTask });
taskModel.belongsToMany(kpiNormModel, { through: kpiNormTask });

module.exports = kpiNormTask;
