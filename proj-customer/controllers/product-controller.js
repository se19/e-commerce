const Product = require('../models/product');

//Get danh sách sản phẩm, bao gồm cả tìm kiếm, sort, order và phân trang
const listProduct = (req, res, next) => {
    Product.find()
        .then(products => {
            console.log(products);
            res.render('product-view/shop-list', {
                prods: products,
                pageTitle: 'Danh sách sản phẩm'
            });
        })
        .catch(err => {
            console.log(err);
        });
};

//Get thông tin sản phẩm
// const getDetail = (req, res, next) => {
//     res.render('product-view/product');
// }

module.exports = {
    listProduct
//    getDetail
}