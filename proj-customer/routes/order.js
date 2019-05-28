var express = require('express');
var router = express.Router();

const auth_controller = require('../controllers/auth-controller');
const order_controller = require('../controllers/order-controller');

router
  //Gọi check auth ở những route muốn bảo mật (chỉ xem được khi đã đăng nhập)
  .use('/', auth_controller.checkAuth)

  .get('/history-pay', order_controller.listBills)
  .get('/bill-detail', order_controller.getBillInfo)

module.exports = router;