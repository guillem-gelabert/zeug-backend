const moment = require('moment');

const getEasiness = (correct, easiness) => {
  if (correct) return easiness + 0.22;
  return Math.max(1.3, easiness - 0.8);
};

const getConsecutiveCorrectAnswers = (correct, consecutiveCorrectAnswers) => {
  if (correct) return consecutiveCorrectAnswers + 1;
  return 0;
};

const getNextDueDate = (correct, easiness, consecutiveCorrectAnswers) => {
  const interval = correct ? 6 * Math.floor(Math.pow(easiness, consecutiveCorrectAnswers - 1)) : 1;
  const now = moment(new Date()).utc();
  return now.add(interval, 'days').format('YYYY-MM-DD');
};

exports.updateReviewedCard = (card, correct) => {
  const easiness = getEasiness(correct, card.easiness);
  const consecutiveCorrectAnswers = getConsecutiveCorrectAnswers(correct, card.consecutiveCorrectAnswers);
  const nextDueDate = getNextDueDate(correct, easiness, consecutiveCorrectAnswers);
  const updatedCard = Object.assign(card, {
    easiness,
    consecutiveCorrectAnswers,
    nextDueDate,
  });
  return updatedCard;
};
