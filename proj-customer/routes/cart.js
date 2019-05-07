var express = require('express');
var router = express.Router();

const cart_controller = require('../controllers/cart-controller');

router
  .get('/', cart_controller.listCart)
  .get('/update', cart_controller.updateCart)
  .get('/delete', cart_controller.deleteItems)

module.exports = router;