const express = require('express');
const router = express.Router();

const auth_controller = require('../app/controllers/auth-controller');
const product_controller = require('../app/controllers/product-controller');

router
  //check auth
  .use('/', auth_controller.checkAuth)
  //List
  .get('/', product_controller.list_products)
  //Get create view
  .get('/add', product_controller.init_product)
  //Create
  .post('/add', product_controller.create_product)
  //Get info
  .get('/:productId', product_controller.get_product)
  //Update
  .post('/:productId/edit', product_controller.update_product)
  //Delete
  .post('/:productId/delete', product_controller.delete_product)

module.exports = router;