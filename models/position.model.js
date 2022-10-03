const { DataTypes } = require('sequelize');
const db = require('../config/database');
const { positionLevelModel, kpiNormModel, departmentModel, userModel } = require('./index');

const positions = db.define('positions', {
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
    manager: {
        type: DataTypes.INTEGER,
    },
    position_levels_id: {
        type: DataTypes.INTEGER,
    },
    department_id: {
        type: DataTypes.INTEGER,
    },
});

positionLevelModel.hasMany(positions, {
    targetKey: 'id',
    foreignKey: 'position_levels_id',
});
positions.belongsTo(positionLevelModel, { foreignKey: 'position_levels_id', targetKey: 'id' });

positions.hasMany(kpiNormModel, {
    targetKey: 'id',
    foreignKey: 'position_id',
});
kpiNormModel.belongsTo(positions, { foreignKey: 'position_id', targetKey: 'id' });

departmentModel.hasMany(positions, {
    targetKey: 'id',
    foreignKey: 'department_id',
});
positions.belongsTo(departmentModel, { foreignKey: 'department_id', targetKey: 'id' });

positions.hasMany(userModel, {
    targetKey: 'id',
    foreignKey: 'position_id',
  });
userModel.belongsTo(positions, { foreignKey: 'position_id', targetKey: 'id' });

module.exports = positions;
