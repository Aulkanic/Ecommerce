const router = require('express').Router();
const { CheckoutProducts,UserOrderlist,CancelOrder } = require('.././Controller/Order/order.controller');

router.post('/Checkout',CheckoutProducts);
router.get('/:userId',UserOrderlist);
router.post('/CancelOrder',CancelOrder);

module.exports = router;