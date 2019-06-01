//Controller chung, implement tất cả các action dùng chung

//Import constant list
var constants = require('../constants/index');

const Brand = require('../models/brand');
const Category = require('../models/category');
const Product = require('../models/product');

//lấy các biến toàn cục, có thể gọi trực tiếp vào trong ejs. 
//lưu vào res.locals
const getLocalsVariables = async (req, res, next) => {

    //lấy thông tin user đang đăng nhập từ session.
    if (req.session && req.session.passport && req.session.passport.user) {
        res.locals.userLogin = req.session.passport.user;
    } else {
        res.locals.userLogin = {};
    }

    //tạo biến data lưu các thông tin như constants, danh sách loại hàng, thương hiệu
    res.locals.data = {}

    // lấy danh sách thương hiệu
    res.locals.data.brands = await Brand.find();

    // lấy danh sách loại sản phẩm + số lượng sản phẩm mỗi loại

    // gom nhóm sản phẩm theo nhóm 
    let groupCat = await Product.aggregate([{
        $group: {
            _id: "$categoryId",
            count: { $sum: 1}   // đếm số lượng theo mỗi loại
        }
    }]);

    // join bảng groupCat với bảng Category
    let groupCatDetail = await Category.populate(groupCat, {path: '_id'});
    //console.log(groupCatDetail);
    
    res.locals.data.categories = groupCatDetail;

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