'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class keyReport extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      keyReport.belongsTo(models.departments, {
        foreignKey: 'departmentId',
        targetKey: 'id'
      });
      keyReport.belongsTo(models.DailyWork, {
        foreignKey: 'dailyWorkId',
        targetKey: 'id'
      });
      keyReport.hasMany(models.keyRecord, {
        targetKey: 'id',
        foreignKey: 'keyReportId',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
      });
    }
  }
  keyReport.init({
    name: DataTypes.STRING,
    departmentId: DataTypes.INTEGER,
    dailyWorkId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'keyReport',
  });
  return keyReport;
};