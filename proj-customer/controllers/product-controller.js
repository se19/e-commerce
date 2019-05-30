const Product = require('../models/product');

const ITEMS_PER_PAGE = 4;

//Get danh sách sản phẩm, bao gồm cả tìm kiếm, sort, order và phân trang
const listProduct = (req, res, next) => {
    // trường hợp không có '?page' thì page = 1
    const page = +req.query.page || 1;

    let totalItems;

    Product.find()
        .countDocuments() // đếm số items;
        .then(numProducts => {
            totalItems = numProducts;
            return Product.find()
                .skip((page - 1) * ITEMS_PER_PAGE)  // bỏ qua ~ item
                .limit(ITEMS_PER_PAGE);             
        })
        .then(products => {
            res.render('product-view/shop-list', {
                prods: products,
                pageTitle: 'Danh sách sản phẩm',
                currentPage: page,
                hasFirstPage: page != 1,
                hasPreviousPage: page > 1,
                previousPage: page - 1,
                hasNextPage: ITEMS_PER_PAGE * page < totalItems,
                nextPage: page + 1,
                hasLastPage: page != Math.ceil(totalItems / ITEMS_PER_PAGE),
                lastPage: Math.ceil(totalItems / ITEMS_PER_PAGE)
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
            _id: prodId
        })
        .then(product => {
            res.render('product-view/product', {
                product: product,
                pageTitle: 'Chi tiết sản phẩm'
            });
        })
        .catch(err => console.log(err));
}

module.exports = {
    listProduct,
    getDetail
}