const Sequelize = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const db = new Sequelize('dwt', 'postgres', 'acevip123', {
  host: 'localhost',
  dialect: 'postgres',
});

// db.sync();

module.exports = db;
