var express = require('express');
var router = express.Router();

router
  .get('/', (req, res, next) => {
    res.redirect('/best-sales/top-products');
  })
  .get('/top-products', (req, res, next) => {
    res.render('top-products');
  })
  .get('/top-stalls', (req, res, next) => {
    res.render('top-stalls');
  })

module.exports = router;