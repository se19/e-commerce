const express = require('express');
const router = express.Router();
const multer = require('multer');

const auth_controller = require('../app/controllers/auth-controller');
const product_controller = require('../app/controllers/product-controller');

//multer upload img
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images/products');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({
  storage: fileStorage
});


router
  //check auth
  .use('/', auth_controller.checkAuth)
  //List
  .get('/', product_controller.list_products)
  //Get create view
  .get('/add', product_controller.init_product)
  //Create
  .post('/add', upload.array('myProductImages'), product_controller.create_product)
  //Get info
  .get('/:productId', product_controller.get_product)
  //Update
  .post('/:productId/edit', product_controller.update_product)
  //Delete
  .post('/:productId/delete', product_controller.delete_product)

module.exports = router;