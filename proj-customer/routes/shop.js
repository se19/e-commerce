var express = require('express');
var router = express.Router();

const base_controller = require('../controllers/base-controller');
const product_controller = require('../controllers/product-controller');

router
  //Lấy các thông tin lưu trữ vào bộ nhớ tạm như thông tin người đăng nhập, danh sách nhóm hàng trên navbar,...v.v
  .use(base_controller.getLocalsVariables)

  // /shop => Get
  .get('/', base_controller.getGroupBrandsDetail, base_controller.getGroupCategoriesDetail, product_controller.listProduct)
  // /shop/brand/_id => Get
  .get('/brand/:brandId', base_controller.getGroupBrandsDetail, base_controller.getGroupCategoriesDetail, product_controller.listProductByBrand)
  // /shop/category/_id => Get
  .get('/category/:categoryId', base_controller.getGroupBrandsDetail, base_controller.getGroupCategoriesDetail, product_controller.listProductByCat)
  // /shop/product => Get
  .get('/:productId', product_controller.getDetail)
  // /shop/_id/add-comment
  .post('/:productId/add-comment', product_controller.addComment)
  // /shop/_id/add-to-cart
  .post('/:productId/add-to-cart', product_controller.addToCart);
module.exports = router;