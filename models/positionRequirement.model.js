'use strict';
const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class positionRequirements extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.requirements.belongsToMany(models.positions, { through: positionRequirements });
      models.positions.belongsToMany(models.requirements, { through: positionRequirements });
    }
  }
  positionRequirements.init({
    requirement_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      position_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
  }, {
    sequelize,
    modelName: 'positionRequirements',
  });
  return positionRequirements;
};
