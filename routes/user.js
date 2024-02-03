const router = require('express').Router();
const { updateUser } = require('../controllers/user');

router.get('/users/me', (req, res) => {
  res.send('Get user information');
});

router.patch('/users/me', updateUser);

module.exports = router;
