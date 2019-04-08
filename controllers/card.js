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
    console.error(error); // eslint-disable-line no-console
    return res.status(500);
  }
};

exports.getReviewCards = async (req, res) => {
  const { id } = req.user;

  try {
    const cards = await Card.getReviewCards(id);
    res.status(200).send(cards);
  } catch (error) {
    console.error(error); // eslint-disable-line no-console
    return res.status(500);
  }
};

exports.getDueCards = async (req, res) => {
  const { id } = req.user;

  try {
    const {
      lastSeenPriority,
      lastUpdate,
      newWordsPerSession,
    } = await User.findByPk(id);

    const now = moment();
    const timeSinceLastUpdate = now.diff(lastUpdate, 'days');

    let newWords;
    if (timeSinceLastUpdate >= 1) {
      newWords = await Word.getNewWords(lastSeenPriority, newWordsPerSession);
    } else {
      newWords = [];
    }

    Card.bulkCreate(
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
  } catch (error) {
    console.error(error); // eslint-disable-line no-console
    return res.status(500);
  }
};

exports.updateCard = async (req, res) => {
  try {
    const { id, correct } = req.body;
    const originalCard = await Card.findByPk(id);
    if (originalCard === null) throw new Error('Card doesnt exist');
    const updatedCard = sm2.updateReviewedCard(originalCard.dataValues, correct);
    Card.update({ ...updatedCard }, { where: { id } }); // throws
    return res.status(201).send(updatedCard);
  } catch (error) {
    console.error(error); // eslint-disable-line no-console
    return res.status(500);
  }
};
