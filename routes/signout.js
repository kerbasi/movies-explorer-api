const router = require('express').Router();

const { logout } = require('../controllers/users');

router.post('/signup', logout);

module.exports = router;
