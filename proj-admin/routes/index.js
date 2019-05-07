const express = require('express');
const router = express.Router();

const home = require('./home');
const stalls = require('./stalls');
const products = require('./products');
const orders = require('./orders');
const users = require('./users');
const bestSales = require('./best-sales');

router
  .use('/', home)
  .use('/stalls', stalls)
  .use('/products', products)
  .use('/orders', orders)
  .use('/users', users)
  .use('/best-sales', bestSales)

  .get('/product-groups', (req, res, next) => {
    res.render('product-group-view/product-group-list');
  })
  .get('/statistics', (req, res, next) => {
    res.render('statistics-view/statistics');
  })
  .get('/login-view/login', (req, res, next) => {
    res.render('login');
  });

module.exports = router;