var express = require('express');
var router = express.Router();

const auth_controller = require('../controllers/auth-controller');
const user_controller = require('../controllers/user-controller');

router
  //Gọi check auth ở những route muốn bảo mật (chỉ xem được khi đã đăng nhập)
  .use('/', auth_controller.checkAuth)

  .get('/profile', user_controller.getIProfileFromSession)
  // .get('/update-info', user_controller.getInfo)
  .post('/update-info', user_controller.updateInfo)
  .post('/change-pw', user_controller.changePw)

module.exports = router;