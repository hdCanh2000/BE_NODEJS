'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class keyRecord extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      keyRecord.belongsTo(models.keyReport, {
        foreignKey: 'keyReportId',
        targetKey: 'id'
      });
    }
  }
  keyRecord.init({
    keyReportId: DataTypes.INTEGER,
    value: DataTypes.INTEGER,

  }, {
    sequelize,
    modelName: 'keyRecord',
  });
  return keyRecord;
};