var express = require('express');
var router = express.Router();

const order_controller = require('../controllers/order-controller');

router
  .get('/history-pay', function (req, res, next) {
    res.render('order-view/history-pay', {});
  })
  .get('/bill-detail', function (req, res, next) {
    res.render('order-view/bill-detail', {});
  })

module.exports = router;