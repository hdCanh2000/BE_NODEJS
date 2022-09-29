const { Sequelize, DataTypes } = require("sequelize");
const db = require('../config/database');
const {departmentModel, unitModel } = require("./Index.js");

const kpiNorms = db.define('kpiNorms', {
    kpiNorm_id: {
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
    manday: {
        type: DataTypes.INTEGER,
    },
    hr:{
        type: DataTypes.TEXT,
    },
    quantity: {
        type: DataTypes.INTEGER,
    },
    unit_id: {
        type: DataTypes.INTEGER,
    },
    department_id: {
        type: DataTypes.INTEGER,
    }
});

departmentModel.hasMany(kpiNorms, {
    targetKey: 'department_id',
    foreignKey: 'department_id',
});
kpiNorms.belongsTo(departmentModel, { foreignKey: 'department_id', targetKey: 'department_id' });

unitModel.hasMany(kpiNorms, {
    targetKey: 'unit_id',
    foreignKey: 'unit_id',
});
kpiNorms.belongsTo(unitModel, { foreignKey: 'unit_id', targetKey: 'unit_id' });


module.exports = kpiNorms;