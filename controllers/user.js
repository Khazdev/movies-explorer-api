const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const config = require('../config');
const {
  CREATED_SUCCESS,
} = require('../constants/status');
const ConflictError = require('../errors/ConflictError');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const NotAuthorizedError = require('../errors/NotAuthorizedError');

const handleErrors = (err, next) => {
  if (err.code === 11000) {
    next(new ConflictError('Данный email уже зарегистрирован'));
  } else if (err.name === 'ValidationError') {
    next(new BadRequestError('Переданы некорректные данные'));
  } else {
    next(err);
  }
};

const findCurrentUser = (userId) => User.findOne({ _id: userId })
  .orFail(new NotFoundError('Пользователь не найден'));

module.exports.getCurrentUser = (req, res, next) => {
  findCurrentUser(req.user._id)
    .then((user) => {
      res.send(user);
    })
    .catch((err) => next(err));
};

module.exports.updateUser = (req, res, next) => {
  const { email, name } = req.body;
  const id = req.user._id;
  User.findByIdAndUpdate(
    id,
    { email, name },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail(new NotFoundError('Пользователь не найден'))
    .then((updatedUser) => res.send(updatedUser))
    .catch((err) => handleErrors(err, next));
};

module.exports.createUser = (req, res, next) => {
  console.log('asdas');
  const {
    email,
    password,
    name,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hashedPassword) => {
      User.create({
        email, password: hashedPassword, name,
      })
        .then((user) => {
          const { password: pass, ...userWithoutPassword } = user.toObject();
          return res.status(CREATED_SUCCESS).send(userWithoutPassword);
        })
        .catch((err) => handleErrors(err, next));
    })
    .catch((err) => next(err));
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .select('+password')
    .orFail(new NotAuthorizedError('Пользователь не найден'))
    .then((user) => {
      bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return next(new NotAuthorizedError('Неправильные почта или пароль'));
          }
          const token = jwt.sign({ _id: user._id }, config.jwtSecret, { expiresIn: '7d' });
          return res.send({ message: 'Авторизация прошла успешно', token });
        });
    })
    .catch(next);
};
