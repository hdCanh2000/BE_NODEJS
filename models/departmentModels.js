const { Sequelize, DataTypes } = require("sequelize");
const db = require('../config/database');

const departments = db.define('departments', {
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
    description: {
        type: DataTypes.TEXT,
    },
    address:{
        type: DataTypes.TEXT,
    },
    slug:{
        type: DataTypes.TEXT,
    },
    organizationLevel: {
        type: DataTypes.INTEGER
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
});

module.exports = departments;