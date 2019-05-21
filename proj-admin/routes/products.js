const express = require('express');
const router = express.Router();

const product_controller = require('../app/controllers/product-controller');

router
  // create
  .get('/add', product_controller.get_add_product)
  .post('/add', product_controller.post_add_product)
  // read
  .get('/', product_controller.get_list_product)
  // update
  .get('/edit/:productId', product_controller.get_edit_product)
  .post('/edit', product_controller.post_edit_product)
  // delete
  .post('/delete', product_controller.post_delete_product)
module.exports = router;