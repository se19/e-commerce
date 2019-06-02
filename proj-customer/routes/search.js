var express = require('express');
var router = express.Router();

const base_controller = require('../controllers/base-controller');
const search_controller = require('../controllers/search-controller');

router
    //Lấy các thông tin lưu trữ vào bộ nhớ tạm như thông tin người đăng nhập, danh sách nhóm hàng trên navbar,...v.v
    .use(base_controller.getLocalsVariables)

    .get('/', base_controller.getGroupBrandsDetail, base_controller.getGroupCategoriesDetail, search_controller.getSearch)
    .get('/advance', search_controller.getAdvanceSearch)
    .get('/advance-query', base_controller.getGroupBrandsDetail, base_controller.getGroupCategoriesDetail, search_controller.getAdvanceSearchQuery)
module.exports = router;