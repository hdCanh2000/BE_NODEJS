'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TargetsUsers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.users.belongsToMany(models.Target, { through: TargetsUsers, onDelete: 'CASCADE' })
      models.Target.belongsToMany(models.users, { through: TargetsUsers, onDelete: 'CASCADE' })
    }
  }
  TargetsUsers.init({
    TargetId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'TargetsUsers',
  });
  return TargetsUsers;
};
