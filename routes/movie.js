const router = require('express').Router();
const { getMovies, createMovie, deleteMovie } = require('../controllers/movie');
const { validateCreateMovie } = require('../middlewares/validation');

router.get('/movies', getMovies);
router.post('/movies', validateCreateMovie, createMovie);
router.delete('/movies/:id', deleteMovie);

module.exports = router;
