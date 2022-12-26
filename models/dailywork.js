'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class DailyWork extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      DailyWork.belongsTo(models.users, { foreignKey: 'userId', targetKey: 'id' })
      DailyWork.belongsTo(models.units, { foreignKey: 'unitId', targetKey: 'id' })
      DailyWork.hasMany(models.DailyWorkLog, {
        targetKey: 'id',
        foreignKey: 'dailyWorkId',
        onDelete: 'SET NULL',
      })
    }
  }

  DailyWork.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      monthKey: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      totalResult: {
        type: DataTypes.DOUBLE,
      },
      status: DataTypes.STRING,
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      unitId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'DailyWork',
    },
  )
  return DailyWork
}
