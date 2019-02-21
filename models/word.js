const { connection } = require('../db');

exports.getNewWords = (lastSeenPriority, newWordsPerSession) => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM words
                WHERE priority > ?
                LIMIT ?`;
    connection.query(sql, [lastSeenPriority, newWordsPerSession], (error, rows) => {
      if (error) reject(error);
      resolve(rows);
    });
  });
};

exports.getWord = (id) => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM words
                WHERE id = ?`;
    connection.query(sql, [id], (error, rows) => {
      if (error) reject(error);
      resolve(...rows);
    });
  });
};
