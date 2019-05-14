const Product = require('../models/product');

//Khởi tạo dữ liệu cho trang chủ
const initialization = (req, res, next) => {
    res.render('home-view/index', {
        pageTitle: 'Shop',
        path: '/'
    });
    getHotItems(req, res, next);
    getNewItems(req, res, next);
}

//Get danh sách sản phẩm bán chạy
const getHotItems = (req, res, next) => {
    Product.find()
        .then(products => {
            console.log(products);
            res.render('home-view/index', {
                hotProds: products,
            });
        })
        .catch(err => {
            console.log(err);
        });
}

//Get danh sách sản phẩm mới
const getNewItems = (req, res, next) => {
    Product.find()
        .then(products => {
            res.render('home-view/index', {
                newProds: products,
            });
        })
        .catch(err => {
            console.log(err);
        });
}

module.exports = {
    getHotItems,
    getNewItems,
    initialization
}