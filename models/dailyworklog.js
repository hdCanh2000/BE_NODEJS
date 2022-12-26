'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DailyWorkLog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      DailyWorkLog.belongsTo(models.DailyWork, {foreignKey: 'dailyWorkId', targetKey: 'id'});
    }
  }
  DailyWorkLog.init({
    note: DataTypes.TEXT,
    quantity: DataTypes.INTEGER,
    status: DataTypes.STRING,
    files: DataTypes.TEXT,
    noticedStatus: DataTypes.STRING,
    noticedDate: DataTypes.DATEONLY,
    reportDate: DataTypes.DATEONLY,
    dailyWorkId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      onDelete: 'SET NULL',
      references: {
        model: 'DailyWorks',
        key: 'id',
      }
    }

  }, {
    sequelize,
    modelName: 'DailyWorkLog',
  });
  return DailyWorkLog;
};
