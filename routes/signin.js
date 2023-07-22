const router = require('express').Router();
const { celebrate } = require('celebrate');

const { celebrateValidationSignin } = require('../middlewares/celebrateValidation');

const { login } = require('../controllers/users');

router.post('/', celebrate(celebrateValidationSignin), login);

module.exports = router;
