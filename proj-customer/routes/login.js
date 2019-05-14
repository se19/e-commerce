var express = require('express');
var router = express.Router();

const auth_controller = require('../controllers/auth-controller');

router
  .get('/', auth_controller.login)
  .post('/', auth_controller.submitLogin)

module.exports = router;