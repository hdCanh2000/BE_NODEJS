const { Sequelize, DataTypes } = require("sequelize");
const db = require('../config/database')
const { departmentModel, userModel } = require("./index.js");


const userDepartment = db.define('userDepartment', {
    userId: {
        type: DataTypes.INTEGER,
    },
    departmentId: {
        type: DataTypes.INTEGER
    }
});

userModel.belongsToMany(departmentModel, { through: userDepartment });
departmentModel.belongsToMany(userModel, { through: userDepartment });

module.exports = userDepartment;
