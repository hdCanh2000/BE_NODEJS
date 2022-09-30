const { DataTypes } = require('sequelize');
const db = require('../config/database');
const { userModel } = require('./index');

const workTracks = db.define('workTracks', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    kpiNorm_id: {
       type: DataTypes.INTEGER,
    },
    note: {
        type: DataTypes.TEXT,
    },
    quantity: {
        type: DataTypes.INTEGER,
    },
    description: {
        type: DataTypes.TEXT,
    },
    deadline: {
        type: DataTypes.DATE,
    },
    user_id: {
        type: DataTypes.INTEGER,
    },
});

userModel.hasMany(workTracks, {
    targetKey: 'id',
    foreignKey: 'user_id',
  });
workTracks.belongsTo(userModel, { foreignKey: 'user_id', targetKey: 'id' });

module.exports = workTracks;
