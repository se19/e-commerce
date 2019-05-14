var express = require('express');
var router = express.Router();

const product_controller = require('../controllers/product-controller');

router
  // /shop => Get
  .get('/', product_controller.listProduct)
  // /shop/product => Get
  .get('/:productId', product_controller.getDetail)
module.exports = router;