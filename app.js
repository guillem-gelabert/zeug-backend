const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const { json, urlencoded } = require('body-parser');
const user = require('./controllers/user');
const { signin, protect } = require('./utils/auth');

const app = express();

const card = require('./controllers/card');

app
  .use(cors())
  .use(json())
  .use(logger('dev'))
  .use(urlencoded({ extended: true }))

  .post('/signup', user.create) // user create
  .post('/signin', signin)
  .get('/cards', protect, card.getDueCards) // gets all scheduled cards and adds new ones
  .put('/cards/:id/answer', card.updateCard); // puts updated card (correct or not) through sm2

module.exports = app;
