'use strict';
const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class TargetLog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      TargetLog.belongsTo(models.TargetInfos, {foreignKey: 'targetInfoId', targetKey: 'id'});
      TargetLog.hasMany(models.keyRecord, {foreignKey: 'targetLogId', targetKey: 'id', onDelete: 'SET NULL', onUpdate: 'CASCADE'});
    }
  }

  TargetLog.init({
    note: DataTypes.TEXT,
    quantity: DataTypes.INTEGER,
    status: DataTypes.STRING,
    files: DataTypes.TEXT,
    noticedStatus: DataTypes.STRING,
    noticedDate: DataTypes.DATEONLY,
    reportDate: DataTypes.DATEONLY,
    targetInfoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    deletedAt: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'TargetLog',
  });
  return TargetLog;
};
