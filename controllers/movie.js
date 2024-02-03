const Movie = require('../models/movie');
const {
  CREATED_SUCCESS,
} = require('../constants/status');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError');

module.exports.createMovie = (req, res, next) => {
  const owner = req.user._id;
  const {
    country, director, duration, year,
    description, image, trailerLink, nameRU,
    nameEN, thumbnail, movieId,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner,
  })
    .then((card) => res.status(CREATED_SUCCESS).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные'));
      }
      next(err);
    });
};

module.exports.getMovies = (req, res, next) => {
  const userId = req.user._id;
  Movie.find({ owner: userId })
    .then((movies) => res.send(movies))
    .catch((err) => next(err));
};

module.exports.deleteMovie = (req, res, next) => {
  const { id: movieId } = req.params;
  Movie.findOne({ _id: movieId })
    .orFail(new NotFoundError('Фильм не найден'))
    .then(async (movie) => {
      if (movie.owner.toString() !== req.user._id.toString()) {
        throw new ForbiddenError('У вас нет прав на удаление этого фильма');
      }
      await movie.deleteOne();
    }).then(() => res.send({ message: 'Фильм удален' }))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Пользователь не найден'));
      } else next(err);
    });
};
