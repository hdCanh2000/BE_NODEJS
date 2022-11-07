'use strict';
const {
    Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class workTrackKeys extends Model {
        static associate(models) {
            models.keys.belongsToMany(models.workTracks, { through: workTrackKeys, onDelete: 'CASCADE' });
            models.workTracks.belongsToMany(models.keys, { through: workTrackKeys, onDelete: 'CASCADE' });
        }
    }
    workTrackKeys.init({
        keyId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        workTrackId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        quantity: {
            type: DataTypes.INTEGER,
        },
    }, {
        sequelize,
        modelName: 'workTrackKeys',
    });
    return workTrackKeys;
};
