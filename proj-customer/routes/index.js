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

router.get('/bill-detail', function(req, res, next) {
  res.render('bill-detail', {});
});

router.get('/history-pay', function(req, res, next) {
  res.render('history-pay', {});
});

router.get('/login', function(req, res, next) {
  res.render('login', {});
});

router.get('/register', function(req, res, next) {
  res.render('register', {});
});

router.get('/forgot', function(req, res, next) {
  res.render('forgot', {});
});

router.get('/update-info', function(req, res, next) {
  res.render('update-info', {});
});

router.get('/thankyou', function(req, res, next) {
  res.render('thankyou', {});
});

module.exports = router;
