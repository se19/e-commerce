var express = require('express');
var router = express.Router();

/* GET users listing. */
router
  .get('/', (req, res, next) => {
    res.render('orders');
  })
  .get('/info', (req, res, next) => {
    res.render('order-info');
  })

module.exports = router;