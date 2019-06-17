var express = require('express');
var router = express.Router();

const base_controller = require('../controllers/base-controller');
const home_controller = require('../controllers/home-controller');
const auth_controller = require('../controllers/auth-controller');
router
  //Lấy các thông tin lưu trữ vào bộ nhớ tạm như thông tin người đăng nhập, danh sách nhóm hàng trên navbar,...v.v
  .use(base_controller.getLocalsVariables)

  .get('/', home_controller.initialization)

  .get('/active/:token', auth_controller.activeNewUser)
  //.get('/auth/google', auth_controller.getSelector)
  //.get('/auth/google/ecommerce', auth_controller.getAuthenticateByGoogle)
module.exports = router;