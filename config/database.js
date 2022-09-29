const Sequelize = require('sequelize');

const db = new Sequelize('dwt', 'postgres', 'vutuan113', {
    host: 'localhost',
    dialect: 'postgres'
  });
db.sync();
module.exports = db;