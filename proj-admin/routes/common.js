const express = require('express');
const router = express.Router();

const locals = require('../util/locals');

const auth_controller = require('../app/controllers/auth-controller');

router
  //use các biến toàn cục, có thể gọi trực tiếp trong ejs. 
  //bao gồm các const và thông tin user đang đăng nhập;
  .use(locals)

  .get('/', (req, res, next) => {
    res.redirect('/home');
  })
  .post('/logout', auth_controller.logout)

module.exports = router;