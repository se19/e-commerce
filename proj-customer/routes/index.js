var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {});
});

router.get('/cart', function(req, res, next) {
  res.render('cart', {});
});

router.get('/checkout', function(req, res, next) {
  res.render('checkout', {});
});

router.get('/product', function(req, res, next) {
  res.render('product', {});
});

router.get('/shop', function(req, res, next) {
  res.render('shop', {});
});

module.exports = router;
