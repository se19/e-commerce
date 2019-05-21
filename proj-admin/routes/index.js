const express = require('express');
const router = express.Router();

const home = require('./home');
const brands = require('./brands');
const categories = require('./categories');
const products = require('./products');
const orders = require('./orders');
const users = require('./users');
const bestSales = require('./best-sales');

router
  .use('/', home)
  .use('/brands', brands)
  .use('/categories', categories)
  .use('/products', products)
  .use('/orders', orders)
  .use('/users', users)
  .use('/best-sales', bestSales)

  .get('/statistics', (req, res, next) => {
    res.render('statistics-view/statistics');
  })
  .get('/login-view/login', (req, res, next) => {
    res.render('login');
  });

module.exports = router;