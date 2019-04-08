const jwt = require('jsonwebtoken');
const { User } = require('../models');

const secret = 'this isnt an appropriate secret';

const newToken = user => jwt.sign({ id: user.id }, secret, { expiresIn: '365d' });

const verifyToken = token => new Promise((resolve, reject) => {
  jwt.verify(token, 'this isnt an appropriate secret', (err, payload) => {
    if (err) return reject(err);
    return resolve(payload);
  });
});

const protect = async (req, res, next) => {
  const [prefix, token] = req.headers.authorization.split(' ');
  if (prefix !== 'Bearer') throw new Error('Authentication error');
  const { id } = await verifyToken(token);
  req.user = { id };
  next();
};

const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    const isPasswordCorrect = await user.checkPassword(user, password);
    if (isPasswordCorrect) {
      const token = newToken(user.dataValues);
      const userData = {
        jwt: token,
        lastSeenPriority: user.lastSeenPriority,
        lastUpdate: user.lastUpdate,
        displayName: user.displayName,
        newWordsPerSession: user.newWordsPerSession,
        email: user.email,
      };
      return res.status(201).send(userData);
    }
    return res.status(401).send('authentication error');
  } catch (error) {
    console.error(error); // eslint-disable-line no-console
    return res.status(500);
  }
};

const signup = async (req, res) => {
  try {
    const user = await User.create(req.body, { attributes: { exclude: ['password'] } });
    const token = newToken(user.dataValues);
    return res.status(201).send({ jwt: token });
  } catch (error) {
    console.error(error); // eslint-disable-line no-console
    return res.status(500);
  }
};

module.exports = {
  signin,
  signup,
  protect,
};
