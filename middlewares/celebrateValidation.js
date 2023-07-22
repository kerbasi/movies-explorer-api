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

module.exports = {
  celebrateValidationSignin,
  celebrateValidationSignup,
  celebrateValidationPatchMe,
};
