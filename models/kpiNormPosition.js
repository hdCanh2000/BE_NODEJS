const { Sequelize, DataTypes } = require("sequelize");
const db = require('../config/database')
const { kpiNormModel, positionModel } = require("./index.js");

const kpiNormPosition = db.define('kpiNormPosition', {
    kpiNorm_id: {
        type: DataTypes.INTEGER,
    },
    positions_id: {
        type: DataTypes.INTEGER
    }
});

kpiNormModel.belongsToMany(positionModel, { through: kpiNormPosition });
positionModel.belongsToMany(kpiNormModel, { through: kpiNormPosition });

module.exports = kpiNormPosition;
