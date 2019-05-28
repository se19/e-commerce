var express = require('express');
var router = express.Router();

const base_controller = require('../controllers/base-controller');
const auth_controller = require('../controllers/auth-controller');
const order_controller = require('../controllers/order-controller');

router
  //Gọi check auth ở những route muốn bảo mật (chỉ xem được khi đã đăng nhập)
  .use('/', auth_controller.checkAuth)
  //Lấy các thông tin lưu trữ vào bộ nhớ tạm như thông tin người đăng nhập, danh sách nhóm hàng trên navbar,...v.v
  .use(base_controller.getLocalsVariables)

  .get('/history-pay', order_controller.listBills)
  .get('/bill-detail', order_controller.getBillInfo)

module.exports = router;