const express = require('express');
const router = express.Router();

const multerHelper = require('../util/image');
const locals = require('../util/locals');

const auth_controller = require('../app/controllers/auth-controller');

router
  //use các biến toàn cục, có thể gọi trực tiếp trong ejs. 
  //bao gồm các const và thông tin user đang đăng nhập;
  .use(locals)

  //redirect home page
  .get('/', (req, res, next) => {
    res.redirect('/home');
  })
  //profile
  .get('/profile', auth_controller.get_profile)
  .post('/profile', multerHelper('users').single('image'), auth_controller.update_profile)

  //logout
  .post('/logout', auth_controller.logout)

module.exports = router;