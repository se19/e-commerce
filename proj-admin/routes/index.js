const express = require('express');
const router = express.Router();

const common = require('./common');
const home = require('./home');
const brands = require('./brands');
const categories = require('./categories');
const products = require('./products');
const orders = require('./orders');
const users = require('./users');
const statistics = require('./statistics');
const top = require('./top');
const login = require('./login');
const forgotPw = require('./forgot-pw');

router
  .use('/', common)
  .use('/home', home)
  .use('/brands', brands)
  .use('/categories', categories)
  .use('/products', products)
  .use('/orders', orders)
  .use('/users', users)
  .use('/top', top)
  .use('/statistics', statistics)
  .use('/login', login)
  .use('/forgot-password', forgotPw)

module.exports = router;