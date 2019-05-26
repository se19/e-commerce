var express = require('express');
var router = express.Router();

const auth_controller = require('../app/controllers/auth-controller');
const top_controller = require('../app/controllers/top-controller');

router
  //check auth
  .use('/', auth_controller.checkAuth)
  //get top
  .get('/', (req, res, next) => {
    res.redirect('/top/products');
  })
  .get('/products', top_controller.list_top_products)
  .get('/brands', top_controller.list_top_brands)

module.exports = router;