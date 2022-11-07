'use strict';
const {
    Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class keys extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            keys.belongsTo(models.units, { foreignKey: 'unit_id', targetKey: 'id' });
            keys.belongsTo(models.positions, { foreignKey: 'position_id', targetKey: 'id' });
        }
    }
    keys.init({
        name: DataTypes.STRING,
        description: DataTypes.TEXT,
    }, {
        sequelize,
        modelName: 'keys',
    });
    return keys;
};
