const { DataTypes } = require('sequelize');
const db = require('../config/database');

const positionLevels = db.define('positionLevels', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
    },
    code: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
    },
});

module.exports = positionLevels;