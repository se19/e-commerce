var express = require('express');
var router = express.Router();

const user_controller = require('../app/controllers/user-controller');

router
  .get('/', user_controller.list_user)
  .post('/add', user_controller.create_user)
  .put('/add', user_controller.update_user)
  .get('/info', user_controller.get_user)
  .delete('/info', user_controller.delete_user)

module.exports = router;