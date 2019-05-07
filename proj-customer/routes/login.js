var express = require('express');
var router = express.Router();

const auth_controller = require('../controllers/auth-controller');

router
  .get('/', function (req, res, next) {
    res.render('auth/login', {});
  })
  .post('/', auth_controller.login)

module.exports = router;