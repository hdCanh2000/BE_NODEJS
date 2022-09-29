const { Sequelize, DataTypes } = require("sequelize");
const db = require('../config/database')
const { departmentModel, userModel } = require("./Index.js");

const userDepartment = db.define('userDepartment', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
    },
    department_id: {
        type: DataTypes.INTEGER
    }
});

    userModel.belongsToMany(departmentModel, { through: userDepartment });
    departmentModel.belongsToMany(userModel, { through: userDepartment });

module.exports = userDepartment;
