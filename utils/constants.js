const REGEXP_LINK = /(https:\/\/|http:\/\/){1}[a-zA-Z.\-_~:/?#[\]@!$&'()*+,;=]+/;

const SUCCESS_CREATE_CODE = 201;
const VALIDATION_ERROR = 400;
const TOKEN_ERROR = 401;
const PERMISSION_ERROR = 403;
const NOTFOUND_ERROR = 404;
const DUPLICATE_ERROR = 409;
const SERVER_ERROR = 500;

const LOGIN_SUCCESS_TEXT = 'Успешный логин.';
const LOGOUT_SUCCESS_TEXT = 'Успешный логаут.';
const DELETE_MOVIE_SUCCESS_TEXT = 'Успешный логаут.';
const VALIDATION_ERROR_TEXT = 'Произошла ошибка, введенные данные неверны.';
const VALIDATION_ERROR_ID_TEXT = 'Некоректно задан id.';
const TOKEN_ERROR_TEXT = 'Неверный логин или пароль.';
const PERMISSION_ERROR_TEXT = 'Этот фильм не пренадлежит текущему пользователю';
const NOTFOUND_ERROR_USER_TEXT = 'Запрашиваемый пользователь не найден.';
const NOTFOUND_ERROR_MOVIE_TEXT = 'Запрашиваемый фильм не найден.';
const DUPLICATE_ERROR_EMAIL_TEXT = 'Уже есть пользователь с данным email.';
const SERVER_ERROR_TEXT = 500;

module.exports = {
  REGEXP_LINK,
  SUCCESS_CREATE_CODE,
  VALIDATION_ERROR,
  TOKEN_ERROR,
  PERMISSION_ERROR,
  NOTFOUND_ERROR,
  DUPLICATE_ERROR,
  SERVER_ERROR,
  LOGIN_SUCCESS_TEXT,
  LOGOUT_SUCCESS_TEXT,
  DELETE_MOVIE_SUCCESS_TEXT,
  VALIDATION_ERROR_TEXT,
  VALIDATION_ERROR_ID_TEXT,
  TOKEN_ERROR_TEXT,
  PERMISSION_ERROR_TEXT,
  NOTFOUND_ERROR_USER_TEXT,
  NOTFOUND_ERROR_MOVIE_TEXT,
  DUPLICATE_ERROR_EMAIL_TEXT,
  SERVER_ERROR_TEXT,
};
