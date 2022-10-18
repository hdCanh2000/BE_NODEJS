'use strict';
const {
    Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class workTrackUsers extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            models.users.belongsToMany(models.workTracks, { through: workTrackUsers });
            models.workTracks.belongsToMany(models.users, { through: workTrackUsers });
        }
    }
    workTrackUsers.init({
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        workTrackId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        isCreated: DataTypes.BOOLEAN,
        isResponsible: DataTypes.BOOLEAN,
    }, {
        sequelize,
        modelName: 'workTrackUsers',
    });
    return workTrackUsers;
};
