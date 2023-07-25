const Movie = require('../models/movie');

const NotFoundError = require('../errors/not-found-error');
const ValidationError = require('../errors/validation-error');
const PermissionError = require('../errors/permission-error');

const { SUCCESS_CREATE_CODE } = require('../utils/constants');

const findAllUserMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((cards) => res.send(cards))
    .catch(next);
};

const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner: req.user._id,
  })
    .then((movie) => res.status(SUCCESS_CREATE_CODE).send({ data: movie }))
    .catch((err) => {
      if (err.name === 'ValidationError') return next(new ValidationError('Произошла ошибка, введенные данные неверны.'));
      return next(err);
    });
};

const deleteMovie = (req, res, next) => {
  Movie.findOne({ movieId: req.params.movieId })
    .orFail(new NotFoundError('Запрашиваемый фильм не найден'))
    .then((movie) => Movie.deleteOne({ movieId: movie.movieId, owner: req.user._id }))
    .then((result) => {
      if (result.deletedCount === 0) {
        throw new PermissionError('Этот фильм не пренадлежит текущему пользователю');
      }
      res.send({ message: 'Фильм удален' });
    })
    .catch((err) => {
      if (err.name === 'CastError') return next(new ValidationError('Некоректно задан id.'));
      return next(err);
    });
};

module.exports = {
  findAllUserMovies,
  createMovie,
  deleteMovie,
};
