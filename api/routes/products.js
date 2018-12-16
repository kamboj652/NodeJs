const express = require('express');
const router = express.Router();


const checkAuth = require('../middleware/check-auth');
const productController = require('../controllers/products');
const multerController = require('../controllers/multer');

//Handle incoming GET requests to /products
router.get('/', productController.products_get_all);

router.post('/', checkAuth, multerController.upload.single('productImage'), productController.products_create_product);

router.get('/:productId', productController.products_get_product)

router.patch('/:productId', checkAuth, productController.product_update_product);

router.delete('/:productId', checkAuth, productController.products_delete_product);

module.exports = router;
