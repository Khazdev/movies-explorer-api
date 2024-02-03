const express = require('express');
const { login, createUser } = require('../controllers/user');
const { validateLogin, validateCreateUser } = require('../middlewares/validation');

const router = express.Router();

router.post('/signin', validateLogin, login);
router.post('/signup', validateCreateUser, createUser);

module.exports = router;
