const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const rootRouter = require('./routes/index');
const config = require('./config');
const errorHandler = require('./middlewares/errorHandler');
const limiter = require('./middlewares/rateLimiter');
const cors = require('./middlewares/cors');

const app = express();

mongoose
  .connect(config.databaseUrl)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });
app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);
app.use(cors);
app.use(limiter);
app.use(rootRouter);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);
app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});
