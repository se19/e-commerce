var express = require('express');
var router = express.Router();

const auth_controller = require('../app/controllers/auth-controller');

router
  .get('/', auth_controller.initLogin)
  .post('/', auth_controller.login)
  //login failed
  .get('/failure', auth_controller.login_failed)

module.exports = router;