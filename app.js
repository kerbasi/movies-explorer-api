require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const limiter = require('./middlewares/limiter');

const app = express();

const routes = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorHandler = require('./middlewares/error-handler');

// const { PORT = 3000, DB_URL = 'mongodb://localhost:27017/ypfilmsdb' } = process.env;
const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;

mongoose.connect(DB_URL);

app.use(express.json());
app.use(cookieParser());
app.use(requestLogger);
app.use(helmet());
app.use(limiter);

app.use(cors());

app.use(routes);

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Running => listening port ${PORT}`);
});
