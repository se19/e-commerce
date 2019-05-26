const express = require('express');
const router = express.Router();

const common = require('./common');
const home = require('./home');
const brands = require('./brands');
const categories = require('./categories');
const products = require('./products');
const orders = require('./orders');
const users = require('./users');
const bestSales = require('./best-sales');
const login = require('./login');

router
  .use('/', common)
  .use('/home', home)
  .use('/brands', brands)
  .use('/categories', categories)
  .use('/products', products)
  .use('/orders', orders)
  .use('/users', users)
  .use('/best-sales', bestSales)

  .get('/statistics', (req, res, next) => {
    res.render('statistics-view/statistics');
  })
  .use('/login', login)

module.exports = router;