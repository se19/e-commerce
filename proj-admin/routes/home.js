var express = require('express');
var router = express.Router();

const auth_controller = require('../app/controllers/auth-controller');
const home_controller = require('../app/controllers/home-controller');

router
  //check auth
  .use('/', auth_controller.checkAuth)
  //Init home page
  .get('/', home_controller.intialization)

module.exports = router;