const protect = async (req, res, next) => {
  const [prefix, token] = req.headers.authorization.split(' ');
  if (prefix !== 'Bearer') throw new Error('Authentication error');
  req.user = { id: token };
  next();
};

const signin = (req, res) => true;

module.exports = {
  signin,
  protect,
};
