const { Sequelize, DataTypes } = require("sequelize");
const db = require('../config/database');
const {unitModel } = require("./Index.js");

const keys = db.define('keys', {
    key_id: {
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
    unit_id: {
        type: DataTypes.INTEGER,
    },

});

unitModel.hasMany(keys, {
    targetKey: 'unit_id',
    foreignKey: 'unit_id',
});
keys.belongsTo(unitModel, { foreignKey: 'unit_id', targetKey: 'unit_id' });

module.exports = keys;