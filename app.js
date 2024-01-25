const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const {errors} = require('celebrate');

const config = require('./config');

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
app.use(express.urlencoded({extended: true}));

app.use(errors());

app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});
