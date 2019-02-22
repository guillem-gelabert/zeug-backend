const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const { json, urlencoded } = require('body-parser');

const app = express();

// require('./db');

const user = require('./controllers/user');
const card = require('./controllers/card');

app
  .use(cors())
  .use(json())
  .use(logger('dev'))
  .use(urlencoded({ extended: true }))
  .post('/users', user.create)
  .get('/users', user.getAll)
  .get('/users/:id', user.getAll)
  .get('/cards/all/:id', card.getAllCards) // gets all scheduled cards for user id
  .get('/cards/due/:id', card.getDueCards) // gets all scheduled cards and adds new ones
  .put('/cards', card.updateCard); // puts updateed card (correct or not) through sm2

module.exports = app;
