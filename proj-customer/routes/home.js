var express = require('express');
var router = express.Router();

const base_controller = require('../controllers/base-controller');
const home_controller = require('../controllers/home-controller');

router
  //Lấy các thông tin lưu trữ vào bộ nhớ tạm như thông tin người đăng nhập, danh sách nhóm hàng trên navbar,...v.v
  .use(base_controller.getLocalsVariables)

  .get('/', home_controller.initialization)

module.exports = router;