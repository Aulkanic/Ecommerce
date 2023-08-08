const { CreateProduct,SelectProduct,SelectProductCategory,SelectProductbyCategory } = require('../Controller/Product/product.controller')
const router = require('express').Router();

router.post('/create',CreateProduct);
router.get('/list/',SelectProduct);
router.get('/list/category/:category/',SelectProductbyCategory);
router.get('/categories',SelectProductCategory);

module.exports = router
