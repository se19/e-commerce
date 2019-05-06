const express = require('express');
const router = express.Router();

const product_group_controller = require('../app/controllers/product-group-controller');

router
  .get('/', product_group_controller.list_product_group)
  .post('/add', product_group_controller.create_product_group)
  .put('/add', product_group_controller.update_product_group)
  .get('/info', product_group_controller.get_product_group)
  .delete('/info', product_controller.delete)

module.exports = router;