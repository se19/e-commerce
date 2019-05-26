var express = require('express');
var router = express.Router();

const auth_controller = require('../app/controllers/auth-controller');

router
  .get('/', (req, res, next) => {
    res.redirect('/home');
  })
  .post('/logout', auth_controller.logout)

module.exports = router;