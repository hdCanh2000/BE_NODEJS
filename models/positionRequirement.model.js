const { DataTypes } = require('sequelize');
const db = require('../config/database');
const { requirementModel, positionModel } = require('./index');

const positionRequirement = db.define('positionRequirement', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    requirement_id: {
        type: DataTypes.INTEGER,
    },
    positions_id: {
        type: DataTypes.INTEGER,
    },
});

requirementModel.belongsToMany(positionModel, { through: positionRequirement });
positionModel.belongsToMany(requirementModel, { through: positionRequirement });

module.exports = positionRequirement;
