const jwt = require('jsonwebtoken');

const TokenError = require('../errors/token-error');

const { MODE_ENV, SECRET_KEY } = process.env;

const { SECRET_KEY_DEV } = require('../utils/constants');

module.exports = (req, res, next) => {
  const { token } = req.cookies.jwt;
  if (!token) {
    return next(new TokenError('Необходима авторизация'));
  }
  let payload;
  try {
    payload = jwt.verify(token, MODE_ENV !== 'production' ? SECRET_KEY_DEV : SECRET_KEY);
  } catch (err) {
    return next(new TokenError('Необходима авторизация'));
  }
  req.user = payload;
  return next();
};
