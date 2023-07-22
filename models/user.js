const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Поле Email обязательно должно быть заполнено'],
    unique: [true, 'Поле Email должно быть уникальным'],
    validate: {
      validator: (email) => isEmail(email),
      message: (props) => `${props.value} неправильный Email`,
    },
  },
  password: {
    type: String,
    required: [true, 'Поле Password обязательно должно быть заполнено'],
    select: false,
  },
  name: {
    type: String,
    required: [true, 'Поле Name обязательно должно быть заполнено'],
    minlength: [2, 'Поле Name должно быть не менее 2 символов'],
    maxlength: [2, 'Поле Name должно быть не более 30 символов'],
  },
}, {
  versionKey: false,
  statics: {
    findUserByCredentials(email, password) {
      return this.findOne({ email }).select('+password')
        .then((user) => {
          if (!user) {
            return Promise.reject(new Error('Неправильные почта или пароль'));
          }
          return bcrypt.compare(password, user.password)
            .then((matched) => {
              if (!matched) {
                return Promise.reject(new Error('Неправильные почта или пароль'));
              }
              return user;
            });
        });
    },
  },
});

module.exports = mongoose.model('user', userSchema);
