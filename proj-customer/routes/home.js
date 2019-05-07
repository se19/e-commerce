var express = require('express');
var router = express.Router();

const home_controller = require('../controllers/home-controller');

router
  .get('/', home_controller.initialization)

module.exports = router;