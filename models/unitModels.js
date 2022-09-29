const { Sequelize, DataTypes } = require("sequelize");
const db = require('../config/database');

const units = db.define('units', {
    id: {
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
    code: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true
    },
});


module.exports = units;