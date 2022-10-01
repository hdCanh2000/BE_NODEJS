const Sequelize = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const db = new Sequelize('dwt', 'postgres', 'acevip123', {
  host: process.env.DB_HOST,
  dialect: 'postgres',
});

db.sync();

module.exports = db;
