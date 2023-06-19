const express = require('express');
const router = express.Router();
const isAuth = require('../middleware/is-auth');

const userController = require('../controllers/user');

router.post('/signup', userController.signUp);
router.post('/signin', userController.signIn);
// router.get('/user-data', isAuth, userController.getUserData);

module.exports = router;
