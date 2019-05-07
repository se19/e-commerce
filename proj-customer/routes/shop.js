var express = require('express');
var router = express.Router();

const product_controller = require('../controllers/product-controller');

router
  .get('/', product_controller.listProduct)
  .get('/product', product_controller.getDetail)

module.exports = router;