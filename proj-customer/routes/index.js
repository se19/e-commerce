//Đây là main router
var express = require('express');
var router = express.Router();

//Import các router con
const homeRoutes = require('./home');
const shopRoutes = require('./shop');
const cartRoutes = require('./cart');
const orderRoutes = require('./order');
const checkoutRoutes = require('./checkout');
const userRoutes = require('./user');
const loginRoutes = require('./login');
const registerRoutes = require('./register');
const forgotPwRoutes = require('./forgot-pw');

router
  .use('/', homeRoutes)
  .use('/shop', shopRoutes)
  .use('/cart', cartRoutes)
  .use('/order', orderRoutes)
  .use('/checkout', checkoutRoutes)
  .use('/user', userRoutes)
  .use('/login', loginRoutes)
  .use('/register', registerRoutes)
  .use('/forgot', forgotPwRoutes)

  .get('/thankyou', function (req, res, next) {
    res.render('common/thankyou', {
      pageTitle: "Đặt hành thành công"
    });
  })

module.exports = router;