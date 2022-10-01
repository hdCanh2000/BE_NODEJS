const Sequelize = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const db = new Sequelize({
  connectionString: process.env.DATABASE_URL,
  address: process.env.DB_HOST,
  dialect: 'postgres',
  ssl: {
    rejectUnauthorized: false,
  },
});

db.sync();

module.exports = db;
