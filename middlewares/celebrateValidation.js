const { Joi } = require('celebrate');
const { REGEXP_LINK } = require('../utils/constants');

module.exports.celebrateValidationSignin = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
};

module.exports.celebrateValidationSignup = {
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(REGEXP_LINK),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
};
