const Brand = require('../models/brand');
const Category = require('../models/category')
const Product = require('../models/product');
const Rate = require('../models/rate');
const Cart = require('../models/cart');

const ITEMS_PER_PAGE = 6;
const REVIEWS_PER_PAGE = 2;

//Get danh sách sản phẩm, bao gồm cả tìm kiếm, sort, order và phân trang
const listProduct = async (req, res, next) => {
    req.session.queryUrl = "";

    /*Phân trang sản phẩm*/
    // trường hợp không có '?page' thì page = 1
    const page = +req.query.page || 1;
    // đếm số items;
    let totalItems = await Product.find().countDocuments();

    const products = await Product.find()
        .skip((page - 1) * ITEMS_PER_PAGE) // bỏ qua ~ item
        .limit(ITEMS_PER_PAGE);

    res.render('product-view/shop-list', {
        brands: res.locals.data.groupBrandsDetail,
        categories: res.locals.data.groupCategoriesDetail,
        prods: products,
        pageTitle: 'Danh sách sản phẩm',
        searchInformation: 'Danh sách sản phẩm',
        currentPage: page,
        hasFirstPage: page != 1,
        hasPreviousPage: page > 1,
        previousPage: page - 1,
        hasNextPage: ITEMS_PER_PAGE * page < totalItems,
        nextPage: page + 1,
        hasLastPage: page != Math.ceil(totalItems / ITEMS_PER_PAGE),
        lastPage: Math.ceil(totalItems / ITEMS_PER_PAGE),
        queryUrl: req.session.queryUrl
    });
};


// Get danh sách product theo loại thương hiệu
const listProductByBrand = async (req, res, next) => {
    req.session.queryUrl = "";

    const brandId = req.params.brandId;
    const brand = await Brand.findById(brandId);
    const brandTitle = brand.title;

    /*Phân trang thương hiệu*/
    // trường hợp không có '?page' thì page = 1
    const page = +req.query.page || 1;

    // đếm số items;
    let totalItems = await Product.find({
        brandId: brandId
    }).countDocuments();

    const products = await Product.find({
            brandId: brandId
        })
        .skip((page - 1) * ITEMS_PER_PAGE) // bỏ qua ~ item
        .limit(ITEMS_PER_PAGE);

    res.render('product-view/shop-list', {
        brands: res.locals.data.groupBrandsDetail,
        categories: res.locals.data.groupCategoriesDetail,
        prods: products,
        pageTitle: 'Danh sách sản phẩm thuộc thương hiệu' + brandTitle,
        searchInformation: 'Danh sách sản phẩm thuộc thương hiệu ' + brandTitle,
        currentPage: page,
        hasFirstPage: page != 1,
        hasPreviousPage: page > 1,
        previousPage: page - 1,
        hasNextPage: ITEMS_PER_PAGE * page < totalItems,
        nextPage: page + 1,
        hasLastPage: page != Math.ceil(totalItems / ITEMS_PER_PAGE),
        lastPage: Math.ceil(totalItems / ITEMS_PER_PAGE),
        queryUrl: req.session.queryUrl
    });
}

// Get danh sách product theo loại sản phẩm
const listProductByCat = async (req, res, next) => {
    req.session.queryUrl = "";

    const catId = req.params.categoryId;
    const cat = await Category.findById(catId);
    const catTitle = cat.title;

    /*Phân trang loại sản phẩm*/
    // trường hợp không có '?page' thì page = 1
    const page = +req.query.page || 1;

    // đếm số items;
    let totalItems = await Product.find({
        categoryId: catId
    }).countDocuments();

    const products = await Product.find({
            categoryId: catId
        })
        .skip((page - 1) * ITEMS_PER_PAGE) // bỏ qua ~ item
        .limit(ITEMS_PER_PAGE);

    res.render('product-view/shop-list', {
        brands: res.locals.data.groupBrandsDetail,
        categories: res.locals.data.groupCategoriesDetail,
        prods: products,
        pageTitle: 'Danh sách sản phẩm thuộc ' + catTitle,
        searchInformation: 'Danh sách sản phẩm thuộc ' + catTitle,
        currentPage: page,
        hasFirstPage: page != 1,
        hasPreviousPage: page > 1,
        previousPage: page - 1,
        hasNextPage: ITEMS_PER_PAGE * page < totalItems,
        nextPage: page + 1,
        hasLastPage: page != Math.ceil(totalItems / ITEMS_PER_PAGE),
        lastPage: Math.ceil(totalItems / ITEMS_PER_PAGE),
        queryUrl: req.session.queryUrl
    });
}



//Get thông tin sản phẩm
const getDetail = async (req, res, next) => {
    req.session.queryUrl = "";
    
    const prodId = req.params.productId;
    const product = await Product.findOne({
        _id: prodId
    })
    // product.view += 1;
    // await product.save();

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
        lastPage: Math.ceil(totalReviews / REVIEWS_PER_PAGE),
        queryUrl: req.session.queryUrl
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
                    res.redirect('/shop/' + prodId);
                })
                .catch(err => console.log(err));
        })
}


const addToCart = async (req, res, next) => {
    const prodId = req.params.productId;
    const product = await Product.findById(prodId);


    const item = {
        product: product,
        quantity: +req.body.quantity,
        amount: product.price * +req.body.quantity
    }


    Cart.add(req.session.cart, item);
    res.json(prodId); // res linh tinh cái gì đó 
    //res.redirect('/shop/' + prodId);
    //console.log(req.session.cart);
}

module.exports = {
    listProduct,
    listProductByBrand,
    listProductByCat,
    getDetail,
    addComment,
    addToCart
}