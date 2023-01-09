'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class TargetsPositions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.positions.belongsToMany(models.Target, { through: TargetsPositions, onDelete: 'CASCADE' })
      models.Target.belongsToMany(models.positions, { through: TargetsPositions, onDelete: 'CASCADE' })
    }
  }

  TargetsPositions.init(
    {
      TargetId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      positionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'TargetsPositions',
    },
  )
  return TargetsPositions
}
