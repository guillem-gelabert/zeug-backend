const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const { json, urlencoded } = require('body-parser');
const { signin, signup, protect } = require('./middleware/auth');

const app = express();

const card = require('./controllers/card');
const users = require('./controllers/user');

app.disable('etag');
app
  .use(cors())
  .use(json())
  .use(logger('dev'))
  .use(urlencoded({ extended: true }))

  .post('/signup', signup)
  .post('/signin', signin)
  .get('/cards', protect, card.getDueCards) // gets all scheduled cards and adds new ones
  .put('/cards/:id/answer', protect, card.updateCard) // puts updated card (correct or not) through sm2
  .get('/user', protect, users.getUserDetails);

module.exports = app;
