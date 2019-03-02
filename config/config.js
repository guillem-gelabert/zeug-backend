module.exports = {
  development: {
    username: 'root',
    password: 'password',
    database: 'zeug',
    host: '127.0.0.1',
    dialect: 'mysql',
    logging: false,
  },
  test: {
    username: 'root',
    password: 'password',
    database: 'zeug',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
  production: {
    username: 'root',
    password: 'password',
    database: 'zeug',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
  authorisation: {
    secret: process.env.API_SECRET,
  },
};
