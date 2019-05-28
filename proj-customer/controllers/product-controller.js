const Product = require('../models/product');

//Get danh sách sản phẩm, bao gồm cả tìm kiếm, sort, order và phân trang
const listProduct = (req, res, next) => {
    Product.find()
        .then(products => {
            res.render('product-view/shop-list', {
                prods: products,
                pageTitle: 'Danh sách sản phẩm',
                session: req.session
            });
        })
        .catch(err => {
            console.log(err);
        })
};

//Get thông tin sản phẩm
const getDetail = (req, res, next) => {
    const prodId = req.params.productId;
    Product.findOne({
            productId: prodId
        })
        .then(product => {
            //console.log(product);
            res.render('product-view/product', {
                product: product,
                pageTitle: 'Chi tiết sản phẩm',
                session: req.session
            });
        })
        .catch(err => console.log(err));
}

module.exports = {
    listProduct,
    getDetail
}