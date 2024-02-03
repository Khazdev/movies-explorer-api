const express = require('express');
const { login, createUser } = require('../controllers/user');

const router = express.Router();

router.post('/signin', login);
router.post('/signup', createUser);

module.exports = router;
