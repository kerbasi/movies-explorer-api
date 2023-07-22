const NotFoundError = require('../errors/not-found-error');

const notFoundError = (req, res, next) => {
  next(new NotFoundError('Неправильный путь'));
};

module.exports = notFoundError;
