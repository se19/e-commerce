var express = require('express');
var router = express.Router();

const stall_controller = require('../app/controllers/stall-controller');

router
  .get('/', stall_controller.list_stall)
  .post('/add', stall_controller.create_stall)
  .put('/add', stall_controller.update_stall)
  .get('/info', stall_controller.get_stall)
  .delete('/info', stall_controller.delete_stall)

module.exports = router;