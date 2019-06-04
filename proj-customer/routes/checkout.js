var express = require('express');
var router = express.Router();

const base_controller = require('../controllers/base-controller');
const checkout_controller = require('../controllers/checkout-controller');

router
  //Lấy các thông tin lưu trữ vào bộ nhớ tạm như thông tin người đăng nhập, danh sách nhóm hàng trên navbar,...v.v
  .use(base_controller.getLocalsVariables)

  .get('/', checkout_controller.initializationCheckout)

module.exports = router;