const REGEXP_LINK = /(https:\/\/|http:\/\/){1}[a-zA-Z.\-_~:/?#[\]@!$&'()*+,;=]+/;

const SUCCESS_CREATE_CODE = 201;
const VALIDATION_ERROR = 400;
const TOKEN_ERROR = 401;
const PERMISSION_ERROR = 403;
const NOTFOUND_ERROR = 404;
const DUPLICATE_ERROR = 409;
const SERVER_ERROR = 500;

module.exports = {
  REGEXP_LINK,
  SUCCESS_CREATE_CODE,
  VALIDATION_ERROR,
  TOKEN_ERROR,
  PERMISSION_ERROR,
  NOTFOUND_ERROR,
  DUPLICATE_ERROR,
  SERVER_ERROR,
};
