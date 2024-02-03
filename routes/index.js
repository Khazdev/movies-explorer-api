const express = require('express');
const userRoutes = require('./user');
const movieRoutes = require('./movie');
const authorization = require('./authorization');
const authentication = require('../middlewares/auth');
const NotFoundError = require('../errors/NotFoundError');

const router = express.Router();

router.use('/', authorization);
router.use(authentication);
router.use('/', userRoutes);
router.use('/', movieRoutes);

router.use('*', () => {
  throw new NotFoundError('Здесь ничего нет :)');
});
module.exports = router;
