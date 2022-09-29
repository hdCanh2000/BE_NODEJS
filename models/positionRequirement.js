const { Sequelize, DataTypes } = require("sequelize");
const db = require('../config/database')
const { requirementModel, positionModel } = require("./Index.js");

const positionRequirement = db.define('positionRequirement', {
    requirement_id: {
        type: DataTypes.INTEGER,
    },
    positions_id: {
        type: DataTypes.INTEGER
    }
});

requirementModel.belongsToMany(positionModel, { through: positionRequirement });
positionModel.belongsToMany(requirementModel, { through: positionRequirement });

module.exports = positionRequirement;
