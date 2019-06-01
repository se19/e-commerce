const express = require('express');
const router = express.Router();
const multerHelper = require('../util/image');

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
  .post('/add', multerHelper('products').array('myProductImages'), product_controller.create_product)
  //Get info
  .get('/:productId', product_controller.get_product)
  //Update
  .post('/:productId/edit', multerHelper('products').array('myProductImages'), product_controller.update_product)
  //Delete
  .post('/:productId/delete', product_controller.delete_product)
  //Images
  .post('/:productId/images/set-default', product_controller.set_default_image)
  .post('/:productId/images/delete', product_controller.delete_image)
  //Reviews
  .post('/:productId/review/add-or-edit', product_controller.create_update_review)
  .post('/:productId/review/delete', product_controller.delete_review)

module.exports = router;