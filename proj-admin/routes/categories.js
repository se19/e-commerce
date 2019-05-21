const express = require('express');
const router = express.Router();

const category_controller = require('../app/controllers/category-controller');

router
  //List
  .get('/', category_controller.list_categories)
  //Get create view
  .get('/add', category_controller.init_category)
  //Create
  .post('/add', category_controller.create_category)
  //Get info
  .get('/:categoryId', category_controller.get_category)
  //Update
  .post('/:categoryId/edit', category_controller.update_category)
  //Delete
  .post('/:categoryId/delete', category_controller.delete_category)

module.exports = router;