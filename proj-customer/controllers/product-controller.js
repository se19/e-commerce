const Brand = require('../models/brand');
const Category = require('../models/category')
const Product = require('../models/product');
const Rate = require('../models/rate');

const ITEMS_PER_PAGE = 6;
const REVIEWS_PER_PAGE = 2;

//Get danh sách sản phẩm, bao gồm cả tìm kiếm, sort, order và phân trang
const listProduct = async (req, res, next) => {
    /*Phân trang sản phẩm*/

    // trường hợp không có '?page' thì page = 1
    const page = +req.query.page || 1;
    // đếm số items;
    let totalItems = await Product.find().countDocuments();

    const products = await Product.find()
        .skip((page - 1) * ITEMS_PER_PAGE) // bỏ qua ~ item
        .limit(ITEMS_PER_PAGE);

    const brands = await Brand.find();
    const categories = await Category.find();

    res.render('product-view/shop-list', {
        brands: brands,
        categories: categories,
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
};

// Get danh sách product theo loại sản phẩm
const listProductByCat = async (req, res, next) => {
    const catId = req.params.categoryId;
    const items = await Product.find({
        categoryId: catId
    });
    console.log(items);
    res.redirect('/shop');
}


//Get thông tin sản phẩm
const getDetail = async (req, res, next) => {
    const prodId = req.params.productId;
    const product = await Product.findOne({
        _id: prodId
    })

    /*Phân trang bình luận*/
    // trường hợp không có '?page' thì page = 1
    const page = +req.query.page || 1;

    // tìm trong bảng rate những review có id trùng với id trong product.reviews
    const totalReviews = await Rate.find({
        _id: {
            $in: product.reviews
        }
    }).countDocuments() // đếm số items;

    const reviews = await Rate.find({
            _id: {
                $in: product.reviews
            }
        })
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
    listProductByCat,
    getDetail,
    addComment
}