const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'zeug'
});

connection.connect(function (err) {
  if (err) console.log(err); // eslint-disable-line no-console
  console.log('You are now connected...');// eslint-disable-line no-console
});

module.exports = {
  connection
};
