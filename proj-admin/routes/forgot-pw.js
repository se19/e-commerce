var express = require('express');
var router = express.Router();

const auth_controller = require('../app/controllers/auth-controller');

router
  .get('/', auth_controller.init_forgot_pw)
  .post('/', auth_controller.forgot_pw)
  //reset via token
  .get('/reset/:token', auth_controller.init_reset_pw)
  .post('/reset/:token', auth_controller.reset_pw)

module.exports = router;