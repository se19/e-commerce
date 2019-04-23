var express = require('express');
var router = express.Router();

/* GET users listing. */
router
  .get('/', (req, res, next) => {
    res.render('products');
  })
  .get('/add', (req, res, next) => {
    res.render('product-info');
  })
  .get('/info', (req, res, next) => {
    res.render('product-info');
  })

module.exports = router;