const moment = require('moment');
const { shuffle } = require('lodash');

const sm2 = require('../SM2/sm2');

const { Card, User, Word } = require('../models');

exports.getCard = async (req, res) => {
  const { id } = req.params;

  try {
    const card = await Card.findByPk(id);
    return res.status(200).send(card);
  } catch (error) {
    return console.error(error); // eslint-disable-line no-console
  }
};

exports.getReviewCards = async (req, res) => {
  const { id } = req.user;

  try {
    const cards = await Card.getReviewCards(id);
    res.status(200).send(cards);
  } catch (error) {
    console.error(error); // eslint-disable-line no-console
  }
};

exports.getDueCards = async (req, res) => {
  const { id } = req.user;

  const {
    lastSeenPriority,
    lastUpdate,
    newWordsPerSession,
  } = await User.findByPk(id);

  const timeSinceLastUpdate = moment().diff(lastUpdate, 'days');
  const newWords = timeSinceLastUpdate >= 1
    ? await Word.getNewWords(lastSeenPriority, newWordsPerSession)
    : [];
  const newCards = await Card.bulkCreate(
    newWords.map(word => ({ userId: id, wordId: word.id })),
  );

  User.update({
    lastSeenPriority: lastSeenPriority + newWordsPerSession,
    lastUpdate: new Date(),
  }, { where: { id } });

  const reviewCards = await Card.getReviewCards(id);
  const dueCards = reviewCards.map(card => ({
    cardId: card.id,
    wordId: card.word.id,
    article: card.word.article,
    substantive: card.word.substantive,
    stage: card.stage,
    consecutiveCorrectAnswers: card.stage === 'SEEN' ? 1 : 0,
    firstAnswerCorrect: null,
  }));
  return res.status(200).send(shuffle(dueCards));
};

exports.updateCard = async (req, res) => {
  const { id, correct } = req.body;
  const originalCard = await Card.findByPk(id);
  try {
    const updatedCard = sm2.updateReviewedCard(originalCard, correct);
    Card.update({ ...updatedCard }, { where: { id } });
    res.status(201).send(updatedCard);
  } catch (error) {
    console.error(error); // eslint-disable-line no-console
    res.status = 500;
  }
};
