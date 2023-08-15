const router = require('express').Router();

const notFoundError = require('../controllers/notFoundError');

router.all('/*', notFoundError);

module.exports = router;
