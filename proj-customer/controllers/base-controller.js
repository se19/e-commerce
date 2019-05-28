//Controller chung, implement tất cả các action dùng chung

//Import constant list
var constants = require('../constants/index');

//lấy các biến toàn cục, có thể gọi trực tiếp vào trong ejs. 
//lưu vào res.locals
const getLocalsVariables = (req, res, next) => {

    //lấy thông tin user đang đăng nhập từ session.
    if (req.session && req.session.passport && req.session.passport.user) {
        res.locals.userLogin = req.session.passport.user;
    } else {
        res.locals.userLogin = {};
    }

    //tạo biến data lưu các thông tin như constants, danh sách loại hàng, thương hiệu
    res.locals.data = {}

    //lấy các const từ file constans
    res.locals.data.constants = constants;

    next();
}

const getAllCatelogs = (req, res, next) => {

}

//Lấy danh sách nhãn hàng hiển thị lên navbar
const getAllBrands = (req, res, next) => {

}

//Lấy số lượng sản phẩm trong giỏ hàng hiển thị lên navbar
const getCartQuantity = (req, res, next) => {

}

module.exports = {
    getLocalsVariables,
    getAllCatelogs,
    getAllBrands,
    getCartQuantity
}