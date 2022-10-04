const { DataTypes } = require('sequelize');
const db = require('../config/database');
const { workTrackModel, kpiNormModel } = require('./index');

const kpiNormWorkTrack = db.define('kpiNormWorkTrack', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    isResponsible: {
        type: DataTypes.BOOLEAN,
    },
});

kpiNormModel.belongsToMany(workTrackModel, { through: kpiNormWorkTrack });
workTrackModel.belongsToMany(kpiNormModel, { through: kpiNormWorkTrack });

module.exports = kpiNormWorkTrack;
