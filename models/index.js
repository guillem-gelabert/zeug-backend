require('dotenv').config();

const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env]; // TOUN

const sequelize = new Sequelize(config.database, config.username.config.password, config);

sequelize
  .authenticate()
  .then(() => {
    // eslint-disable-next-line no-console
    console.log('Database connection has been established successfully. 🤖');
  })
  .catch((error) => {
  // eslint-disable-next-line no-console
    console.error('Unable to connect to the database:', error);
  });

const User = require('./users.model')(Sequelize, sequelize);
const Word = require('./words.model')(Sequelize, sequelize);
const Card = require('./cards.model')(Sequelize, sequelize);

module.exports = {
  User,
  Word,
  Card,
};
