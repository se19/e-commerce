var express = require('express');
var router = express.Router();

const auth_controller = require('../app/controllers/auth-controller');
const order_controller = require('../app/controllers/order-controller');

router
  //check auth
  .use('/', auth_controller.checkAuth)
  //List
  .get('/', order_controller.list_orders)
  //Get create view
  // .get('/add', order_controller.create_order)
  //Create
  // .post('/add', order_controller.create_order)
  //Get info
  .get('/:orderId', order_controller.get_order)
  //Update
  // .post('/:orderId/edit', order_controller.update_order)
  .post('/:orderId/change-status', order_controller.change_order_status)
  .post('/:orderId/cancel', order_controller.cancel_order)
  .post('/:orderId/edit-user', order_controller.update_userinfo_order)
  //Delete
  .post('/:orderId/delete', order_controller.delete_order)

module.exports = router;