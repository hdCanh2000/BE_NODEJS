const { DataTypes } = require('sequelize');
const db = require('../config/database');
const token = require('./token.model');

const users = db.define('users', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    email: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: {
            args: true,
            msg: 'Username already in use!',
            },
    },
    password: {
        type: DataTypes.TEXT,
    },
    role: {
        type: DataTypes.ENUM(['user', 'admin', 'manager', 'super_admin']),
        defaultValue: 'user',
    },
    code: {
      type: DataTypes.TEXT,
      unique: true,
    },
    name: {
        type: DataTypes.TEXT,
      },
    dateOfBirth: {
        type: DataTypes.DATE,
    },
    dateOfJoin: {
        type: DataTypes.DATE,
    },
    phone: {
      type: DataTypes.INTEGER,
    },
    address: {
        type: DataTypes.TEXT,
    },
    position: {
        type: DataTypes.ENUM(['Nhân viên', 'Quản lý']),
        defaultValue: 'Nhân viên',
    },
});

users.hasMany(token, {
    targetKey: 'id',
    foreignKey: 'user_id',
  });
token.belongsTo(users, { foreignKey: 'user_id', targetKey: 'id' });

module.exports = users;
