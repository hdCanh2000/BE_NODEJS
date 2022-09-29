const { Sequelize, DataTypes } = require("sequelize");
const db = require('../config/database');
const {positionLevelModel } = require("./Index.js");

const positions = db.define('positions', {
    positions_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true
    },
    description: {
        type: DataTypes.TEXT,
    },
    address: {
        type: DataTypes.TEXT
    },
    manager: {
        type: DataTypes.INTEGER
    },
    jobType: {
        type: DataTypes.INTEGER
    },
    position_levels_id:{
        type: DataTypes.INTEGER
    }
});

positionLevelModel.hasMany(positions, {
    targetKey: 'position_levels_id',
    foreignKey: 'position_levels_id',
});
positions.belongsTo(positionLevelModel, { foreignKey: 'position_levels_id', targetKey: 'position_levels_id' });


module.exports = positions;