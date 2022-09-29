const { Sequelize, DataTypes } = require("sequelize");
const db = require('../config/database');

const users = db.define('users',{
    user_id:{
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
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM(["user", "admin", "manager", "super_admin"]),
        defaultValue: "user",
    },
    code:{
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true
    },
    name:{
        type: DataTypes.TEXT,
      },
    dateOfBirth:{
        type: DataTypes.DATE,
        allowNull: false,
    },
    dateOfJoin:{
        type: DataTypes.DATE,
        allowNull: false,
    },
    phone:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
    address:{
        type: DataTypes.TEXT,
    },
    position:{
        type: DataTypes.ENUM(["Nhân viên", "Quản lý"]),
        defaultValue: "Nhân viên"
    },
    departmentId:{
        type: DataTypes.INTEGER,
        allowNull: false,
    }
});

module.exports = users;