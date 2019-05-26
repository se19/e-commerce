var express = require('express');
var router = express.Router();

const auth_controller = require('../app/controllers/auth-controller');
const statistics_controller = require('../app/controllers/statistics-controller');

router
  //check auth
  .use('/', auth_controller.checkAuth)
  //get list
  .get('/', statistics_controller.list_statistics)

module.exports = router;