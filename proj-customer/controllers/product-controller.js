const Product = require('../models/product');
const Rate = require('../models/rate');

const ITEMS_PER_PAGE = 6;
const REVIEWS_PER_PAGE = 2;

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
                .skip((page - 1) * ITEMS_PER_PAGE) // bỏ qua ~ item
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
const getDetail = async (req, res, next) => {
    const prodId = req.params.productId;
    const product = await Product.findOne({
        _id: prodId
    })

    // trường hợp không có '?page' thì page = 1
    const page = +req.query.page || 1;

    // tìm trong bảng rate những review có id trùng với id trong product.reviews
    const totalReviews = await Rate.find({_id: {$in: product.reviews}}).countDocuments() // đếm số items;
    const reviews = await Rate.find({_id: {$in: product.reviews}})
                .skip((page - 1) * REVIEWS_PER_PAGE) // bỏ qua ~ item
                .limit(REVIEWS_PER_PAGE);


    res.render('product-view/product', {
        pageTitle: 'Chi tiết sản phẩm',
        product: product,
        reviews: reviews,
        currentPage: page,
        hasFirstPage: page != 1,
        hasPreviousPage: page > 1,
        previousPage: page - 1,
        hasNextPage: REVIEWS_PER_PAGE * page < totalReviews,
        nextPage: page + 1,
        hasLastPage: page != Math.ceil(totalReviews / REVIEWS_PER_PAGE),
        lastPage: Math.ceil(totalReviews / REVIEWS_PER_PAGE)
    });
}

const addComment = (req, res, next) => {
    const prodId = req.params.productId;

    let newRate = new Rate();
    newRate.rating = req.body.rating;
    newRate.name = req.body.name;
    newRate.phoneNumber = req.body.phoneNumber;
    newRate.message = req.body.message;

    newRate
        .save()
        .then(review => {
            Product.findById(prodId)
                .then(product => {
                    return product.addReview(review);
                })
                .then(result => {
                    //console.log(result);
                    res.redirect('/shop/' + prodId);
                })
                .catch(err => console.log(err));
        })
}

module.exports = {
    listProduct,
    getDetail,
    addComment
}