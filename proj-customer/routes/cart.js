var express = require('express');
var router = express.Router();

const base_controller = require('../controllers/base-controller');
const cart_controller = require('../controllers/cart-controller');

router
  //Lấy các thông tin lưu trữ vào bộ nhớ tạm như thông tin người đăng nhập, danh sách nhóm hàng trên navbar,...v.v
  .use(base_controller.getLocalsVariables)

  .get('/', cart_controller.listCart)
  // phải thêm vô vì không hiểu sao khi thực hiện xong cart_controller.deleteItems nó lại chạy vô route này :((
  //.post('/', (req, res, next) => {})
  .post('/update', cart_controller.updateCart)
  .post('/delete/:productId', cart_controller.deleteItems)

module.exports = router;