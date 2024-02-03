const router = require('express').Router();
const { updateUser, getCurrentUser } = require('../controllers/user');

router.get('/users/me', getCurrentUser);
router.patch('/users/me', updateUser);

module.exports = router;
