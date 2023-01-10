'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class TargetInfos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      TargetInfos.belongsTo(models.users, { foreignKey: 'userId', targetKey: 'id' })
      TargetInfos.belongsTo(models.positions, { foreignKey: 'positionId', targetKey: 'id' })
      TargetInfos.belongsTo(models.Target, { foreignKey: 'targetId', targetKey: 'id' })
      TargetInfos.belongsTo(models.units, { foreignKey: 'unitId', targetKey: 'id' })
      TargetInfos.hasMany(models.TargetLog, { foreignKey: 'targetInfoId', targetKey: 'id' })
    }
  }

  TargetInfos.init(
    {
      name: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      executionPlan: DataTypes.TEXT,
      description: DataTypes.TEXT,
      quantity: DataTypes.INTEGER,
      unitId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      positionId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      manDay: DataTypes.DOUBLE,
      startDate: DataTypes.DATE,
      deadline: DataTypes.DATE,
      status: DataTypes.TEXT,
      managerComment: DataTypes.TEXT,
      managerManDay: DataTypes.INTEGER,
      targetId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'TargetInfos',
    },
  )
  return TargetInfos
}
