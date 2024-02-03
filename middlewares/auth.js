const jwt = require('jsonwebtoken');
const NotAuthorizedError = require('../errors/NotAuthorizedError');
const config = require('../config');

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token || !token.startsWith('Bearer ')) {
    return next(new NotAuthorizedError('Требуется авторизация'));
  }

  const tokenValue = token.replace('Bearer ', '');

  let payload;
  try {
    payload = jwt.verify(tokenValue, config.jwtSecret);
  } catch (e) {
    return next(new NotAuthorizedError('Неверный токен авторизации'));
  }
  req.user = payload;
  return next();
};
