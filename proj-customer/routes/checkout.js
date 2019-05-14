var express = require('express');
var router = express.Router();

const checkout_controller = require('../controllers/checkout-controller');

router
  .get('/', checkout_controller.initializationCheckout)
  .post('/', checkout_controller.addCoupons)

module.exports = router;