const express = require('express');
const router = express.Router();
const isAuth = require('../middleware/is-auth');

const userController = require('../controllers/user');

router.post('/signup', userController.signUp);
router.post('/signin', userController.signIn);
router.post('/create-category', userController.createCategory);
router.post('/create-product', userController.createProduct);
// router.get('/user-data', isAuth, userController.getUserData);

module.exports = router;
