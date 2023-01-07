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
      Target.belongsToMany(models.users, { through: models.TargetsUsers, onDelete: 'CASCADE' })
      Target.belongsTo(models.units, { foreignKey: 'unitId', targetKey: 'id' })
      Target.hasMany(models.TargetLog, {
        targetKey: 'id',
        foreignKey: 'targetId',
        onDelete: 'SET NULL',
      })
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
      deadline: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      managerId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      executionPlan: DataTypes.TEXT,
      manDay: DataTypes.DOUBLE,
      recentManDay: DataTypes.DOUBLE,
      managerComment: DataTypes.TEXT,
      status: DataTypes.STRING,
      unitId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'Target',
    },
  )
  return Target
}
