const express = require('express');
const router = express.Router();

const testController = require('../controllers/test');

//Handle incoming GET requests to /products
router.get('/', testController.test_get);

module.exports = router;