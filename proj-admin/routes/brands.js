var express = require('express');
var router = express.Router();

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
  .post('/add', brand_controller.create_brand)
  //Get info
  .get('/:brandId', brand_controller.get_brand)
  //Update
  .post('/:brandId/edit', brand_controller.update_brand)
  //Delete
  .post('/:brandId/delete', brand_controller.delete_brand)

module.exports = router;