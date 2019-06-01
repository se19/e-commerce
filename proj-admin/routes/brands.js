var express = require('express');
var router = express.Router();
const multerHelper = require('../util/image');

const auth_controller = require('../app/controllers/auth-controller');
const brand_controller = require('../app/controllers/brand-controller');

router
  //check auth
  .use('/', auth_controller.checkAuth)
  //List
  .get('/', brand_controller.list_brands)
  //Get create view
  .get('/add', brand_controller.init_brand)
  //Create
  .post('/add', multerHelper('brands').single('image'), brand_controller.create_brand)
  //Get info
  .get('/:brandId', brand_controller.get_brand)
  //Update
  .post('/:brandId/edit', multerHelper('brands').single('image'), brand_controller.update_brand)
  //Delete
  .post('/:brandId/delete', brand_controller.delete_brand)

module.exports = router;