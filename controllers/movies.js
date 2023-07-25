const Movie = require('../models/movie');

const NotFoundError = require('../errors/not-found-error');
const ValidationError = require('../errors/validation-error');
const PermissionError = require('../errors/permission-error');

const {
  SUCCESS_CREATE_CODE,
  DELETE_MOVIE_SUCCESS_TEXT,
  VALIDATION_ERROR_TEXT,
  VALIDATION_ERROR_ID_TEXT,
  PERMISSION_ERROR_TEXT,
  NOTFOUND_ERROR_MOVIE_TEXT,
} = require('../utils/constants');

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
      if (err.name === 'ValidationError') return next(new ValidationError(VALIDATION_ERROR_TEXT));
      return next(err);
    });
};

const deleteMovie = (req, res, next) => {
  Movie.findOne({ movieId: req.params.movieId })
    .orFail(new NotFoundError(NOTFOUND_ERROR_MOVIE_TEXT))
    .then((movie) => Movie.deleteOne({ movieId: movie.movieId, owner: req.user._id }))
    .then((result) => {
      if (result.deletedCount === 0) {
        throw new PermissionError(PERMISSION_ERROR_TEXT);
      }
      res.send({ message: DELETE_MOVIE_SUCCESS_TEXT });
    })
    .catch((err) => {
      if (err.name === 'CastError') return next(new ValidationError(VALIDATION_ERROR_ID_TEXT));
      return next(err);
    });
};

module.exports = {
  findAllUserMovies,
  createMovie,
  deleteMovie,
};
