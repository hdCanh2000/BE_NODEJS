'use strict';
const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class missionDepartments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.missions.belongsToMany(models.departments, { through: missionDepartments });
      models.departments.belongsToMany(models.missions, { through: missionDepartments });
    }
  }
  missionDepartments.init({
    mission_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    department_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    isResponsible: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'missionDepartments',
  });
  return missionDepartments;
};
