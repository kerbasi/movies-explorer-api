const router = require('express').Router();
const { celebrate } = require('celebrate');
const { celebrateValidationCreateMovie, celebrateValidationDeleteMovie } = require('../middlewares/celebrateValidation');

const {
  createMovie,
  findAllUserMovies,
  deleteMovie,
} = require('../controllers/movies');

router.get('/', findAllUserMovies);

router.post('/', celebrate(celebrateValidationCreateMovie), createMovie);

router.delete('/:movieId', celebrate(celebrateValidationDeleteMovie), deleteMovie);

module.exports = router;
