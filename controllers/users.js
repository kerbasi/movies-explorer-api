const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const NotFoundError = require('../errors/not-found-error');
const ValidationError = require('../errors/validation-error');
const TokenError = require('../errors/token-error');
const DuplicateError = require('../errors/duplicate-error');

const { SUCCESS_CREATE_CODE, SECRET_KEY_DEV } = require('../utils/constants');

const { NODE_ENV, SECRET_KEY } = process.env;

const findMe = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (user) {
        return res.send({
          email: user.email,
          name: user.name,
        });
      }
      throw new NotFoundError('Запрашиваемая карточка не найдена');
    })
    .catch((err) => {
      if (err.name === 'CastError') return next(new ValidationError('Некоректно задан id'));
      return next(err);
    });
};

const updateMe = (req, res, next) => {
  User.findByIdAndUpdate(
    req.user._id,
    {
      email: req.body.email,
      name: req.body.name,
    },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => res.send({
      name: user.email,
      about: user.name,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') return next(new ValidationError('Произошла ошибка, введенные данные неверны'));
      return next(err);
    });
};

const createUser = (req, res, next) => {
  const {
    email, password, name,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email, password: hash, name,
    }))
    .then((user) => res.status(SUCCESS_CREATE_CODE).send({
      email: user.email,
      name: user.name,
      _id: user._id,
    }))
    .catch((err) => {
      if (err.code === 11000) return next(new DuplicateError('Уже есть пользователь с данным email'));
      if (err.name === 'ValidationError') return next(new ValidationError('Произошла ошибка, введенные данные неверны'));
      return next(err);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV !== 'production' ? SECRET_KEY_DEV : SECRET_KEY,
        { expiresIn: '7d' },
      );
      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: true,
      });
      res.send({ message: 'Успешный логин' });
    })
    .catch((err) => next(new TokenError(err.message)));
};

const logout = (req, res) => {
  res.cookie('jwt', 'none', {
    maxAge: 5000,
    httpOnly: true,
    sameSite: true,
  });
  res.send({ message: 'Успешный логаут' });
};

module.exports = {
  findMe,
  updateMe,
  createUser,
  login,
  logout,
};
