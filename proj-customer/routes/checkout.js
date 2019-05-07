var express = require('express');
var router = express.Router();

const checkout_controller = require('../controllers/checkout-controller');

router
  .get('/checkout', checkout_controller.initializationCheckout)
  .post('/checkout', checkout_controller.addCoupons)

module.exports = router;