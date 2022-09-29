const { Sequelize, DataTypes } = require("sequelize");
const db = require('../config/database');
const {unitModel } = require("./Index.js");

const missions = db.define('missions', {
    id  : {
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
    startTime: {
        type: DataTypes.DATE
    },
    endTime:{
        type: DataTypes.DATE
    },
    manday:{
        type: DataTypes.INTEGER
    }
});

unitModel.hasMany(missions, {
    targetKey: 'id',
    foreignKey: 'unit_id',
});
missions.belongsTo(unitModel, { foreignKey: 'unit_id', targetKey: 'id' });

module.exports = missions;