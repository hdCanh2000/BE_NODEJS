const { DataTypes } = require('sequelize');
const db = require('../config/database');
const { kpiNormModel, positionModel } = require('./index');

const kpiNormPosition = db.define('kpiNormPosition', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    kpiNorm_id: {
        type: DataTypes.INTEGER,
    },
    positions_id: {
        type: DataTypes.INTEGER,
    },
});

kpiNormModel.belongsToMany(positionModel, { through: kpiNormPosition });
positionModel.belongsToMany(kpiNormModel, { through: kpiNormPosition });

module.exports = kpiNormPosition;
