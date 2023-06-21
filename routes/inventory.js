const express = require('express');
const router = express.Router();
const isAuth = require('../middleware/is-auth');

const InventoryController = require('../controllers/inventory');

router.get('/get-categories', isAuth, InventoryController.getCategory);
router.post('/create-category', isAuth, InventoryController.createCategory);
router.post('/create-product', isAuth, InventoryController.createProduct);

module.exports = router;