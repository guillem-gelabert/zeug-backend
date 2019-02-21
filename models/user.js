const { connection } = require('../db');

exports.getAll = () => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM users';
    connection.query(sql, (error, data) => {
      if (error) reject(error);
      resolve(data);
    });
  });
};

exports.getOne = (userId) => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM users
                WHERE id = ?`;
    connection.query(sql, [userId], (error, data) => {
      if (error) reject(error);
      resolve(...data);
    });
  });
};

exports.updateDetails = (id, lastSeenPriority, lastUpdate) => {
  return new Promise((resolve, reject) => {
    const sql = `UPDATE users
            SET lastSeenPriority = ?,
            lastUpdate = ?
            WHERE id = ?`;
    connection.query(sql, [lastSeenPriority, lastUpdate, id], (error, data) => {
      if (error) reject(error);
      resolve(data);
    });
  });
};
