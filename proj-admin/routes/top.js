var express = require('express');
var router = express.Router();

const top_controller = require('../app/controllers/top-controller');

router
  .get('/', (req, res, next) => {
    res.redirect('/top/products');
  })
  .get('/products', top_controller.list_top_products)
  .get('/brands', top_controller.list_top_brands)

module.exports = router;