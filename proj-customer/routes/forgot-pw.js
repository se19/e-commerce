var express = require('express');
var router = express.Router();

const auth_controller = require('../controllers/auth-controller');

router
    .get('/', auth_controller.forgorPw)
    .post('/', auth_controller.submitForgorPw)

module.exports = router;