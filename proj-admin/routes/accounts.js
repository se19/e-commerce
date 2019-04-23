var express = require('express');
var router = express.Router();

/* GET users listing. */
router
  .get('/', (req, res, next) => {
    res.render('accounts');
  })
  .get('/info', (req, res, next) => {
    res.render('account-info');
  })

module.exports = router;