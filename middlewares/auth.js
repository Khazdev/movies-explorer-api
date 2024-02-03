const jwt = require('jsonwebtoken');
const NotAuthorizedError = require('../errors/NotAuthorizedError');
const config = require('../config');

module.exports = (req, res, next) => {
  const token = req.headers.authorization.replace("Bearer ", "");;

  if (!token) {
    return next(new NotAuthorizedError('Требуется авторизация'));
  }
  let payload;
  try {
    payload = jwt.verify(token, config.jwtSecret);
  } catch (e) {
    return next(new NotAuthorizedError('Неверный токен авторизации'));
  }
  req.user = payload;
  return next();
};
