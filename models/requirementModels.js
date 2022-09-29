const { Sequelize, DataTypes } = require("sequelize");
const db = require('../config/database');

const requirements = db.define('requirements', {
    requirement_id: {
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
    description: {
        type: DataTypes.TEXT,
    },
});

module.exports = requirements;