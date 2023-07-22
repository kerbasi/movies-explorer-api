const router = require('express').Router();
const { celebrate } = require('celebrate');
const { celebrateValidationPatchMe } = require('../middlewares/celebrateValidation');

const {
  findMe,
  updateMe,
} = require('../controllers/users');

router.get('/me', findMe);

router.patch('/me', celebrate(celebrateValidationPatchMe), updateMe);

module.exports = router;
