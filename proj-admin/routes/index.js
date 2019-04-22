var express = require('express');
var router = express.Router();

/* GET home page. */
router
  .get('/', (req, res, next) => {
    res.render('index', {
      title: 'Admin'
    });
  })
  .get('/groups', (req, res, next) => {
    res.render('groups');
  })
  .get('/orders', (req, res, next) => {
    res.render('orders');
  })
  .get('/accounts', (req, res, next) => {
    res.render('accounts');
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