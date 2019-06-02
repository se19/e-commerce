//Controller chung, implement tất cả các action dùng chung

//Import constant list
var constants = require('../constants/index');

const Brand = require('../models/brand');
const Category = require('../models/category');
const Product = require('../models/product');

//lấy các biến toàn cục, có thể gọi trực tiếp vào trong ejs. 
//lưu vào res.locals
const getLocalsVariables = (req, res, next) => {

    //lấy thông tin user đang đăng nhập từ session.
    if (req.session && req.session.passport && req.session.passport.user) {
        res.locals.userLogin = req.session.passport.user;
    } else {
        res.locals.userLogin = {};
    }

    if (req.session.cart === undefined) {
        req.session.cart = [];
    }

    //tạo biến data lưu các thông tin như constants, danh sách loại hàng, thương hiệu
    res.locals.data = {}

    //Lấy số lượng sản phẩm trong giỏ hàng hiển thị lên navbar
    res.local.data.cartQuantity = req.session.cart.length;

    //lấy các const từ file constans
    res.locals.data.constants = constants;

    next();
}


const getGroupBrandsDetail = async (req, res, next) => {
    /* lấy danh sách thương hiệu + số lượng sản phẩm mỗi thương hiệu */
    // gom sản phẩm theo thương hiệu 
    let groupBrand = await Product.aggregate([{
        $group: {
            _id: "$brandId",
            count: {
                $sum: 1
            } // đếm số lượng theo mỗi loại
        }
    }]);
    // join bảng groupBrand với bảng Brand
    let groupBrandsDetail = await Brand.populate(groupBrand, {
        path: '_id'
    });
    res.locals.data.groupBrandsDetail = groupBrandsDetail;

    next();
}

const getGroupCategoriesDetail = async (req, res, next) => {
    /* lấy danh sách loại sản phẩm + số lượng sản phẩm mỗi loại */
    // gom sản phẩm theo nhóm 
    let groupCat = await Product.aggregate([{
        $group: {
            _id: "$categoryId",
            count: {
                $sum: 1
            } // đếm số lượng theo mỗi loại
        }
    }]);
    // join bảng groupCat với bảng Category
    let groupCategoriesDetail = await Category.populate(groupCat, {
        path: '_id'
    });
    res.locals.data.groupCategoriesDetail = groupCategoriesDetail;

    next();
}

const getAllCategories = async (req, res, next) => {
    let categories = await Category.find();
    res.local.data.categories = categories;

    next();
}

//Lấy danh sách nhãn hàng hiển thị lên navbar
const getAllBrands = async (req, res, next) => {
    let brands = await Brand.find();
    res.local.data.brands = brands;

    next();
}

module.exports = {
    getLocalsVariables,
    getGroupBrandsDetail,
    getGroupCategoriesDetail,
    getAllCategories,
    getAllBrands
}