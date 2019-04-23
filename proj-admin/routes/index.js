const express = require('express');
const router = express.Router();

const stalls = require('./stalls');
const products = require('./products');
const orders = require('./orders');
const accounts = require('./accounts');

router
  .get('/', (req, res, next) => {
    res.render('index', {
      title: 'Admin'
    });
  })
  .use('/stalls', stalls)
  .use('/products', products)
  .use('/orders', orders)
  .use('/accounts', accounts)
  .get('/groups', (req, res, next) => {
    res.render('groups');
  })
  .get('/statistics', (req, res, next) => {
    res.render('statistics');
  })
  .get('/best-sales', (req, res, next) => {
    res.render('best-sales');
  })
  .get('/login', (req, res, next) => {
    res.render('login');
  });

module.exports = router;