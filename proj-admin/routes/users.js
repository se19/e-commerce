var express = require('express');
var router = express.Router();

const user_controller = require('../app/controllers/user-controller');

router
  //List
  .get('/', user_controller.list_users)
  //Get create view
  .get('/add', user_controller.init_user)
  //Create
  .post('/add', user_controller.create_user)
  //Get info
  .get('/:userId', user_controller.get_user)
  //Update
  .post('/:userId/edit', user_controller.update_user)
  //Delete
  .post('/:userId/delete', user_controller.delete_user)

module.exports = router;