var express = require('express');
var router = express.Router();

const auth_controller = require('../controllers/auth-controller');

router
  .get('/', auth_controller.register)
  .post('/', auth_controller.submitRegister)

module.exports = router;