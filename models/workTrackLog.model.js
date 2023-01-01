'use strict';
const {
    Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class workTrackLogs extends Model {
        static associate(models) {
            workTrackLogs.belongsTo(models.workTracks, { foreignKey: 'workTrack_id', targetKey: 'id' });
        }
    }
    workTrackLogs.init({
        status: {
            type: DataTypes.ENUM(['inProgress', 'completed', 'expired']),
            defaultValue: 'inProgress',
        },
        date: DataTypes.STRING,
        note: DataTypes.STRING,
        quantity: DataTypes.INTEGER,
        files: DataTypes.STRING,
        workTrack_id: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'workTrackLogs',
    });
    return workTrackLogs;
};
