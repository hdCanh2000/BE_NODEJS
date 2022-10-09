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
        type: DataTypes.ENUM(['user', 'admin', 'manager']),
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
        type: DataTypes.TEXT,
    },
    dateOfJoin: {
        type: DataTypes.TEXT,
    },
    phone: {
      type: DataTypes.INTEGER,
    },
    address: {
        type: DataTypes.TEXT,
    },
    department_id: {
        type: DataTypes.INTEGER,
    },
    position_id: {
        type: DataTypes.INTEGER,
    },
    isDelete: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
});

users.hasMany(token, {
    targetKey: 'id',
    foreignKey: 'user_id',
  });
token.belongsTo(users, { foreignKey: 'user_id', targetKey: 'id' });

module.exports = users;
