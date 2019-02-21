const moment = require('moment');
const { shuffle } = require('lodash');

const sm2 = require('../SM2/sm2');

const card = require('../models/card.js');
const word = require('../controllers/word');
const user = require('../controllers/user');

const maxPriority = (words) => Math.max(...words.map(w => w.priority));

exports.getCard = async (req, res, cardId) => {
  try {
    return await card.getCard(cardId);
  } catch (error) {
    console.error(error); // eslint-disable-line no-console
  }
};

exports.getReviewCards = async (req, res, userId) => {
  try {
    return await card.getReviewCards(userId);
  } catch (error) {
    console.error(error); // eslint-disable-line no-console
  }
};

exports.getAllCards = async (req, res) => {
  try {
    const userId = req.params.id;
    const reviewCards = await card.getReviewCards(userId);
    res.status(200).send(reviewCards);
  } catch (error) {
    console.error(error); // eslint-disable-line no-console
    res.status = 500;
  }
};

exports.getDueCards = async (req, res) => {
  // CHECK IF NEW WORDS WERE ALREADY FETCHED TODAY
  // [FETCH THEM (ACCORDING TO lastSeenPriority AND lastUpdate) FROM WORDS TABLE]
  // PUT NEW WORDS IN THE CARDS TABLE
  // UPDATE lastSeenPriority AND lastUpdate IN THE USERS TABLE
  // GET ALL DUE CARDS FROM CARDS TABLE (INCLUDING THE NEWLY ADDED)

  const userId = req.params.id;

  // CHECK IF NEW WORDS WERE ALREADY FETCHED TODAY
  // get user details
  const {
    lastSeenPriority,
    lastUpdate 
} = userDetails = await user.getUserDetails(req, res, userId);

  const timeSinceLastUpdate = moment().diff(lastUpdate, 'days');
  // FETCH THEM (ACCORDING TO lastSeenPriority AND lastUpdate) FROM WORDS TABLE
  // if no words were not fetched today, do it
  if (timeSinceLastUpdate >= 1 || lastSeenPriority === null) {
    newWords = await word.getNewWords(req, res, userDetails);
    newLastSeenPriority = maxPriority(newWords); // get the highest priority of the fetched cards

    // PUT NEW WORDS IN THE CARDS TABLE
    card.addCards(userId, newWords);

    // UPDATE lastSeenPriority AND lastUpdate IN THE USERS TABLE
    const now = moment(new Date()).utc();
    newLastUpdate = now.format('YYYY-MM-DD');
    user.updateUserDetails(req, res, userId, newLastSeenPriority, newLastUpdate);
  }

  // GET ALL DUE CARDS FROM CARDS TABLE (INCLUDING THE NEWLY ADDED)
  const dueCards = await card.getReviewCards(userId);

  const promises = dueCards.map(async (card) => {
    const data = await word.getWord(req, res, card.wordId); // database query to get words by foreign key
    return {
      cardId: card.id,
      wordId: card.wordId,
      article: data.article,
      substantive: data.substantive,
      stage: card.stage,
      consecutiveCorrectAnswers: card.stage === 'SEEN' ? 1 : 0,
      firstAnswerCorrect: null,
    };
  });
  Promise.all(promises).then((cards) => {
    res.send(shuffle(cards));
    res.status(200);
  });
};

exports.updateCard = async (req, res) => {
  const { cardId, correct } = req.body;
  const originalCard = await this.getCard(req, res, cardId);
  try {
    const updatedCard = sm2.updateReviewedCard(originalCard, correct);
    card.updateCard(updatedCard);
    res.status(201).send(updatedCard);
  } catch (error) {
    console.error(error); // eslint-disable-line no-console
    res.status = 500;
  }
};