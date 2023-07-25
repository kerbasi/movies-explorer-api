const { Joi } = require('celebrate');
const { REGEXP_LINK } = require('../utils/constants');

const celebrateValidationSignin = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
};

const celebrateValidationSignup = {
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(REGEXP_LINK),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
};

const celebrateValidationPatchMe = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    name: Joi.string().required().min(2).max(30),
  }),
};

const celebrateValidationCreateMovie = {
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().regex(REGEXP_LINK),
    trailerLink: Joi.string().required().regex(REGEXP_LINK),
    thumbnail: Joi.string().required().regex(REGEXP_LINK),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    movieId: Joi.number().required(),
  }),
};

const celebrateValidationDeleteMovie = {
  params: Joi.object().keys({
    movieId: Joi.hex().required(),
  }),
};

module.exports = {
  celebrateValidationSignin,
  celebrateValidationSignup,
  celebrateValidationPatchMe,
  celebrateValidationCreateMovie,
  celebrateValidationDeleteMovie,
};
