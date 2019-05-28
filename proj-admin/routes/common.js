var express = require('express');
var router = express.Router();

//Import constant list
var constants = require('../constants/index');

const auth_controller = require('../app/controllers/auth-controller');

router
  //use các biến toàn cục, có thể gọi trực tiếp trong ejs. 
  //bao gồm các const và thông tin user đang đăng nhập;
  .use(function (req, res, next) {
    res.locals.constants = constants;
    if (req.session && req.session.passport && req.session.passport.user) {
      res.locals.userLogin = req.session.passport.user;
    }
    next();
  })

  .get('/', (req, res, next) => {
    res.redirect('/home');
  })
  .post('/logout', auth_controller.logout)

module.exports = router;