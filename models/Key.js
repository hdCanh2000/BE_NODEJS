const { DataTypes } = require('sequelize');
const db = require('../config/database');
const { unitModel } = require('./index');

const keys = db.define('keys', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
    },
    unit_id: {
        type: DataTypes.INTEGER,
    },

});

unitModel.hasMany(keys, {
    targetKey: 'id',
    foreignKey: 'unit_id',
});
keys.belongsTo(unitModel, { foreignKey: 'unit_id', targetKey: 'id' });

module.exports = keys;
