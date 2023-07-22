require('dotenv').config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const app = express();

const mongoose = require('mongoose');

const { errors } = require('celebrate');

const limiter = require('./middlewares/limiter');
const routes = require('./routes/index');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const errorHandler = require('./middlewares/error-handler');

const { PORT = 3000, DB_URL = 'mongodb://localhost:27017/ypfilmsdb' } = process.env;

mongoose.connect(DB_URL);

app.use(express.json());
app.use(requestLogger);
app.use(helmet());
app.use(limiter);

app.use(cors());

app.use(routes);

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
});
