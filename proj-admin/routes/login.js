var express = require('express');
var router = express.Router();

const auth_controller = require('../app/controllers/auth-controller');

router
  .get('/', auth_controller.initLogin)
  .post('/', auth_controller.login)

module.exports = router;