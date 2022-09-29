const { Sequelize, DataTypes } = require("sequelize");
const db = require('../config/database');
const {departmentModel, unitModel } = require("./Index.js");

const kpiNorms = db.define('kpiNorms', {
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
    targetKey: 'id',
    foreignKey: 'department_id',
});
kpiNorms.belongsTo(departmentModel, { foreignKey: 'department_id', targetKey: 'id' });

unitModel.hasMany(kpiNorms, {
    targetKey: 'id',
    foreignKey: 'unit_id',
});
kpiNorms.belongsTo(unitModel, { foreignKey: 'unit_id', targetKey: 'id' });


module.exports = kpiNorms;