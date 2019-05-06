var express = require('express');
var router = express.Router();

const account_controller = require('../app/controllers/account-controller');

router
  .get('/', account_controller.list_account)
  .post('/add', account_controller.create_account)
  .put('/add', account_controller.update_account)
  .get('/info', account_controller.get_account)
  .delete('/info', account_controller.delete_account)

module.exports = router;