const router = require('express').Router();
const { getMovies, createMovie, deleteMovie } = require('../controllers/movie');
const { validateCreateMovie, validateGetMovie } = require('../middlewares/validation');

router.get('/movies', getMovies);
router.post('/movies', validateCreateMovie, createMovie);
router.delete('/movies/:id', validateGetMovie, deleteMovie);

module.exports = router;
