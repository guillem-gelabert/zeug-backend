const { connection } = require('../db');

exports.getReviewCards = (userId) => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM cards
                WHERE userId = ?
                AND nextDueDate <= CURRENT_TIMESTAMP`;
    connection.query(sql, [userId], (error, rows) => {
      if (error) reject(error);
      resolve(rows);
    });
  });
};

exports.addCards = (userId, newWords) => {
  return new Promise((resolve, reject) =>{
    const words = newWords.map(word => {
      return [userId, word.id];
    });
    const sql = `INSERT INTO cards (userId, wordId)
                VALUES ?`;
    connection.query(sql, [words],
      (error, results) => {
        if (error) reject(error);
        resolve(results);
      });
  });
};

exports.getCard = (cardId) => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM cards
                WHERE id = ?`;
    connection.query(sql, [cardId], (error, results) => {
      if (error) reject(error);
      resolve(results[0]);
    });
  });
};

exports.updateCard = (updatedCard) => {
  const { easiness, consecutiveCorrectAnswers, nextDueDate, id } = updatedCard;
  const newDetails = [easiness, consecutiveCorrectAnswers, nextDueDate, id];

  return new Promise((resolve, reject) => {
    const sql = `UPDATE cards
                SET easiness = ?,
                consecutiveCorrectAnswers = ?,
                nextDueDate = ?,
                stage = 'SEEN'
                WHERE id = ?`;
    connection.query(sql, newDetails, (error, results) => {
      if (error) reject(error);
      resolve(results);
    });
  });
};
