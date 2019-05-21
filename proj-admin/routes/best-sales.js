var express = require('express');
var router = express.Router();

const top_products_controller = require('../app/controllers/top-products-controller');
const top_brands_controller = require('../app/controllers/top-brands-controller');

router
  .get('/', (req, res, next) => {
    res.redirect('/best-sales/top-products');
  })
  .get('/top-products', top_products_controller.list_top_products)
  .get('/top-brands', top_brands_controller.list_top_brands)

module.exports = router;