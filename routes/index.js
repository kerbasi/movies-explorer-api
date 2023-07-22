const router = require('express').Router();

const loginRouter = require('./signin');
const logoutRouter = require('./signout');
const createUserRouter = require('./signup');
const userRouter = require('./users');
const cardRouter = require('./movies');
const notFoundRouter = require('./notFound');
const auth = require('../middlewares/auth');

router.post('/signin', loginRouter);
router.post('/signout', logoutRouter);
router.post('/signup', createUserRouter);

router.use('/movies', auth, cardRouter);
router.use('/users', auth, userRouter);
router.use('*', auth, notFoundRouter);

module.exports = router;
