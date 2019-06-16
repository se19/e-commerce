var express = require('express');
var router = express.Router();

const base_controller = require('../controllers/base-controller');
const auth_controller = require('../controllers/auth-controller');
const user_controller = require('../controllers/user-controller');

router
  //Gọi check auth ở những route muốn bảo mật (chỉ xem được khi đã đăng nhập)
  .use('/', auth_controller.checkAuth)
  //Lấy các thông tin lưu trữ vào bộ nhớ tạm như thông tin người đăng nhập, danh sách nhóm hàng trên navbar,...v.v
  .use(base_controller.getLocalsVariables)

  .get('/profile', user_controller.getProfile)
  .post('/update-info', user_controller.updateInfo)
  .get('/change-pw', user_controller.getChangePw)
  .post('/change-pw', user_controller.postChangePw)

module.exports = router;