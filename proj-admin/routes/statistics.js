var express = require('express');
var router = express.Router();

const statistics_controller = require('../app/controllers/statistics-controller');

router
  .get('/', statistics_controller.list_statistics)

module.exports = router;