var express = require('express');
var router = express.Router();

const home_controller = require('../app/controllers/home-controller');

router
  .get('/', home_controller.intialization)

module.exports = router;