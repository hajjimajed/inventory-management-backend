const express = require('express');
const router = express.Router();
const isAuth = require('../middleware/is-auth');

const userController = require('../controllers/user');

router.post('/signup', userController.signUp);
router.post('/signin', userController.signIn);
router.put('/edit', isAuth, userController.editUser);

module.exports = router;
