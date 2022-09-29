const Sequelize = require('sequelize');

const db = new Sequelize('dwt', 'postgres', 'huonghuong1412', {
    host: 'localhost',
    dialect: 'postgres',
  });

db.sync();

module.exports = db;
