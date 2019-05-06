const express = require('express');
const router = express.Router();

const product_controller = require('../app/controllers/product-controller');

router
  .get('/', product_controller.list_product)
  .post('/add', product_controller.create_product)
  .put('/add', product_controller.update_product)
  .get('/info', product_controller.get_product)
  .delete('/info', product_controller.delete_product)

module.exports = router;