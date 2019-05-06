var express = require('express');
var router = express.Router();

const order_controller = require('../app/controllers/order-controller');

router
  .get('/', order_controller.list_order)
  .post('/add', order_controller.create_order)
  .put('/add', order_controller.update_order)
  .get('/info', order_controller.get_order)
  .delete('/info', order_controller.delete_order)

module.exports = router;