const mongoose = require('mongoose');
const isUrl = require('validator/lib/isURL');
const { mustBeFilled } = require('../utils/helpers');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: [true, mustBeFilled('country')],
  },
  director: {
    type: String,
    required: [true, mustBeFilled('director')],
  },
  duration: {
    type: Number,
    required: [true, mustBeFilled('duration')],
  },
  year: {
    type: String,
    required: [true, mustBeFilled('year')],
  },
  description: {
    type: String,
    required: [true, mustBeFilled('description')],
  },
  image: {
    type: String,
    required: [true, mustBeFilled('image')],
    validate: {
      validator: (url) => isUrl(url),
      message: (props) => `${props.value} неправильный URL`,
    },
  },
  trailerLink: {
    type: String,
    required: [true, mustBeFilled('trailerLink')],
    validate: {
      validator: (url) => isUrl(url),
      message: (props) => `${props.value} неправильный URL`,
    },
  },
  thumbnail: {
    type: String,
    required: [true, mustBeFilled('thumbnail')],
    validate: {
      validator: (url) => isUrl(url),
      message: (props) => `${props.value} неправильный URL`,
    },
  },
  owner: {
    required: [true, mustBeFilled('owner')],
    type: mongoose.Schema.Types.ObjectId,
  },
  movieId: {
    type: Number,
    required: [true, mustBeFilled('movieId')],
  },
  nameRU: {
    type: String,
    required: [true, mustBeFilled('nameRu')],
  },
  nameEN: {
    type: String,
    required: [true, mustBeFilled('nameEn')],
  },
}, {
  versionKey: false,
});

module.exports = mongoose.model('movie', movieSchema);
