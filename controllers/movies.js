const Movie = require('../models/movie');

const NotFoundError = require('../errors/not-found-error');
const ValidationError = require('../errors/validation-error');

const { SUCCESS_CREATE_CODE } = require('../utils/constants');

const findAllMovies = (req, res, next) => {
  Movie.find({})
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
      console.log(err);
      if (err.name === 'ValidationError') return next(new ValidationError(`Произошла ошибка, введенные данные неверны. ${err.message}`));
      return next(err);
    });
};

const deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .orFail(new NotFoundError('Запрашиваемый фильм не найден'))
    .then((movie) => Movie.deleteOne({ _id: movie.id, owner: req.user._id }))
    .then((result) => {
      console.log(result);
      res.send({ message: 'Фильм удален' });
    })
    .catch((err) => {
      if (err.name === 'CastError') return next(new ValidationError(`Некоректно задан id. ${err.message}`));
      return next(err);
    });
};

module.exports = {
  findAllMovies,
  createMovie,
  deleteMovie,
};
