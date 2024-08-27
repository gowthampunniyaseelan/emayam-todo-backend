const Sequelize = require('sequelize');
const dbConfig = require('../config/db');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: dbConfig.pool
});

const db = {};
db.Sequelize = sequelize;
db.User = require('./user')(sequelize, Sequelize);
db.Task = require('./task')(sequelize, Sequelize);

module.exports = db;
