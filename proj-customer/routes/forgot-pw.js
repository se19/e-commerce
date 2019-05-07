var express = require('express');
var router = express.Router();

const auth_controller = require('../controllers/auth-controller');

router
    .get('/', function (req, res, next) {
        res.render('auth/forgot', {});
    })
    .post('/', auth_controller.forgorPw)

module.exports = router;