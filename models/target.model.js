'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Target extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Target.belongsTo(models.users, { foreignKey: 'userId', targetKey: 'id' });
      Target.belongsTo(models.units, { foreignKey: 'unitId', targetKey: 'id' });
      Target.hasMany(models.TargetLog, {
        targetKey: 'id',
        foreignKey: 'targetId',
        onDelete: 'SET NULL',
      });
    }
  }
  Target.init({
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
      allowNull: false,
    },
    managerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity:{
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
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }

  }, {
    sequelize,
    modelName: 'Target',
  });
  return Target;
};
