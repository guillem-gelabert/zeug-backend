const word = require('../models/word.js');

exports.getNewWords = async (req, res, userDetails) => {
  const { lastSeenPriority, newWordsPerSession } = userDetails;
  try {
    return await word.getNewWords(lastSeenPriority || 0, newWordsPerSession);
  } catch (error) {
    console.error(error); // eslint-disable-line no-console
    res.status = 500;
  }
};

exports.getWord = async (req, res, id) => {
  try {
    return await word.getWord(id);
  } catch (error) {
    console.error(error); // eslint-disable-line no-console
    res.status = 500;
  }
};
