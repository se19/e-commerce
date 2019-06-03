var express = require('express');
var router = express.Router();
const multerHelper = require('../util/image');

const auth_controller = require('../app/controllers/auth-controller');
const user_controller = require('../app/controllers/user-controller');

router
  //check auth
  .use('/', auth_controller.checkAuth)

  //Administrators
  //List
  .get('/administrators', user_controller.list_administrators)
  //Get create view
  .get('/administrators/add', user_controller.init_administrator)
  //Create
  .post('/administrators/add', multerHelper('users').single('image'), user_controller.create_user)
  //Get info
  .get('/administrators/:userId', user_controller.get_user)
  //Update
  .post('/administrators/:userId/edit', multerHelper('users').single('image'), user_controller.update_user)
  //Delete
  .post('/administrators/:userId/delete', user_controller.delete_administrator)

  //Customers
  //List
  .get('/customers', user_controller.list_customers)
  //Get create view
  .get('/customers/add', user_controller.init_customer)
  //Create
  .post('/customers/add', multerHelper('users').single('image'), user_controller.create_user)
  //Get info
  .get('/customers/:userId', user_controller.get_user)
  //Update
  .post('/customers/:userId/edit', multerHelper('users').single('image'), user_controller.update_user)
  //Delete
  .post('/customers/:userId/delete', user_controller.delete_customer)
  .post('/customers/:userId/reset-password', user_controller.reset_pw_customer)
  .post('/customers/:userId/upgrade', user_controller.upgrade_user)

module.exports = router;