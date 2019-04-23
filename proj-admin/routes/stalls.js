var express = require('express');
var router = express.Router();

router
  .get('/', (req, res, next) => {
    res.render('stalls');
  })
  .get('/info', (req, res, next) => {
    res.render('stall-info');
  })

module.exports = router;