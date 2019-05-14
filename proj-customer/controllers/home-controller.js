const Product = require('../models/product');

let hotProds = [];
let newProds = [];

//Khởi tạo dữ liệu cho trang chủ
const initialization = async (req, res, next) => {
    await getHotItems();
    await getNewItems();

    await res.render('home-view/index', {
        pageTitle: 'Shop',
        path: '/',
        hotProds: hotProds,
        newProds: newProds
    });
}

//Get danh sách sản phẩm bán chạy
const getHotItems = () => {
    Product.find()
        .exec(function (err, products) {
            if (err) throw err;
            hotProds = products;
            // console.log(products);
        });
}

//Get danh sách sản phẩm mới
const getNewItems = () => {
    Product.find()
        .exec(function (err, products) {
            if (err) throw err;
            newProds = products;
            // console.log(products);
        });
}

module.exports = {
    initialization
}