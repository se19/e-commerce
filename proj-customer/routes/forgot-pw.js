var express = require('express');
var router = express.Router();

const base_controller = require('../controllers/base-controller');
const auth_controller = require('../controllers/auth-controller');

router
    //Lấy các thông tin lưu trữ vào bộ nhớ tạm như thông tin người đăng nhập, danh sách nhóm hàng trên navbar,...v.v
    .use(base_controller.getLocalsVariables)

    .get('/', auth_controller.forgorPw)
    .post('/', auth_controller.submitForgorPw)

    .get('/reset/:token', auth_controller.getNewPw)
    .post('/reset', auth_controller.postNewPw)
module.exports = router;