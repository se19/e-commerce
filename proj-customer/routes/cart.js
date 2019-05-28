var express = require('express');
var router = express.Router();

const base_controller = require('../controllers/base-controller');
const cart_controller = require('../controllers/cart-controller');

router
  //Lấy các thông tin lưu trữ vào bộ nhớ tạm như thông tin người đăng nhập, danh sách nhóm hàng trên navbar,...v.v
  .use(base_controller.getLocalsVariables)

  .get('/', cart_controller.listCart)
  .get('/update', cart_controller.updateCart)
  .get('/delete', cart_controller.deleteItems)

module.exports = router;