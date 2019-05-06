var express = require('express');
var router = express.Router();

const top_products_controller = require('../app/controllers/top-products-controller');
const top_stalls_controller = require('../app/controllers/top-stalls-controller');

router
  .get('/', (req, res, next) => {
    res.redirect('/best-sales/top-products');
  })
  .get('/top-products', top_products_controller.list_top_products)
  .get('/top-stalls', top_stalls_controller.list_top_stalls)

module.exports = router;