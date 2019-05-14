var express = require('express');
var router = express.Router();

const user_controller = require('../controllers/user-controller');

router
  .get('/', function (req, res, next) {
    res.redirect('/user/update-info');
  })
  .get('/update-info', user_controller.getInfo)
  .post('/update-info', user_controller.updateInfo)
  .post('/change-pw', user_controller.changePw)

module.exports = router;