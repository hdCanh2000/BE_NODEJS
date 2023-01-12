'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Target extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Target.belongsTo(models.positions, { foreignKey: 'positionId', targetKey: 'id' })
    }
  }

  Target.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      executionPlan: DataTypes.TEXT,
      manDay: DataTypes.DOUBLE,
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      positionId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Target',
    },
  )
  return Target
}
