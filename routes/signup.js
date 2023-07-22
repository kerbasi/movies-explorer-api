const router = require('express').Router();
const { celebrate } = require('celebrate');

const { celebrateValidationSignup } = require('../middlewares/celebrateValidation');

const { createUser } = require('../controllers/users');

router.post('/', celebrate(celebrateValidationSignup), createUser);

module.exports = router;
