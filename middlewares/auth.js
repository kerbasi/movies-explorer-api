const jwt = require('jsonwebtoken');
const TokenError = require('../errors/token-error');

const { MODE_ENV, SECRET_KEY } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new TokenError('Необходима авторизация'));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, MODE_ENV !== 'production' ? 'some-secret-key' : SECRET_KEY);
  } catch (err) {
    return next(new TokenError('Необходима авторизация'));
  }

  req.user = payload;

  return next();
};
