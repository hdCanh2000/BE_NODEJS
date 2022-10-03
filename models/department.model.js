const { DataTypes } = require('sequelize');
const db = require('../config/database');
const { userModel } = require('./index');

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
        unique: true,
    },
    description: {
        type: DataTypes.TEXT,
    },
    address: {
        type: DataTypes.TEXT,
    },
    organizationLevel: {
        type: DataTypes.INTEGER,
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
    parent_id: {
        type: DataTypes.INTEGER,
    },
});

departments.hasMany(userModel, {
    targetKey: 'id',
    foreignKey: 'department_id',
  });
userModel.belongsTo(departments, { foreignKey: 'department_id', targetKey: 'id' });

module.exports = departments;
