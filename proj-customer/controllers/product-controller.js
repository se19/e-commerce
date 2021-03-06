const Brand = require('../models/brand');
const Category = require('../models/category')
const Product = require('../models/product');
const Rate = require('../models/rate');
const Cart = require('../models/cart');

const ITEMS_PER_PAGE = 6;
const REVIEWS_PER_PAGE = 3;

//Get danh sách sản phẩm, bao gồm cả tìm kiếm, sort, order và phân trang
const listProduct = async (req, res, next) => {
    // let queryFilterOneUrl = "";
    // let queryFilterTwoUrl = "";
    // const numberPurchased = +req.query.numberPurchased;
    // const price = +req.query.price;
    // if (numberPurchased && price) {
    //     queryFilterOneUrl = "numberPurchased=" + numberPurchased + "&";
    //     queryFilterTwo = "&price=" + price;
    //     req.session.queryUrl = queryFilterOneUrl.slice(0, -1) + queryFilterTwoUrl + "&";
    // } else if (numberPurchased && !price) {
    //     queryFilterOneUrl = "numberPurchased=" + numberPurchased + "&";
    //     req.session.queryUrl = queryFilterOneUrl;
    // } else if (!numberPurchased && price) {
    //     queryFilterTwoUrl = "&price=" + price;
    //     req.session.queryUrl = "price" + price + "&";
    // } else {
    //     req.session.queryUrl = "";
    // }

    let sort = "";
    const price = +req.query.price;
    if (price) {
        req.session.queryUrl = "price=" + price + "&";
        if (price == 1) {
            sort = "asc";
        } else {
            sort = "des";
        }
    } else {
        req.session.queryUrl = ""
    }
    
    console.log(sort);
    /*Phân trang sản phẩm*/
    // trường hợp không có '?page' thì page = 1
    const page = +req.query.page || 1;
    // đếm số items;
    let totalItems = await Product.find({
        available: true
    }).countDocuments();

    const products = await Product.find({
            available: true
        })
        .sort({
            price: price
        })
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
        queryUrl: req.session.queryUrl,
        sort: sort
    });
};


// Get danh sách product theo loại thương hiệu
const listProductByBrand = async (req, res, next) => {
    let sort = "";
    const price = +req.query.price;
    if (price) {
        if (price == 1) {
            sort = "asc";
        } else {
            sort = "des";
        }
        req.session.queryUrl = "price=" + price + "&";
    } else {
        req.session.queryUrl = "";
    }

    const brandId = req.params.brandId;
    const brand = await Brand.findById(brandId);
    const brandTitle = brand.title;

    /*Phân trang thương hiệu*/
    // trường hợp không có '?page' thì page = 1
    const page = +req.query.page || 1;

    // đếm số items;
    let totalItems = await Product.find({
        brandId: brandId,
        available: true
    }).countDocuments();

    const products = await Product.find({
            brandId: brandId,
            available: true
        })
        .sort({
            price: price
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
        queryUrl: req.session.queryUrl,
        sort: sort
    });
}

// Get danh sách product theo loại sản phẩm
const listProductByCat = async (req, res, next) => {

    let sort = "";
    const price = +req.query.price;
    if (price) {
        if (price == 1) {
            sort = "asc";
        } else {
            sort = "des";
        }
        req.session.queryUrl = "price=" + price + "&";
    } else {
        req.session.queryUrl = "";
    }

    const catId = req.params.categoryId;
    const cat = await Category.findById(catId);
    const catTitle = cat.title;

    /*Phân trang loại sản phẩm*/
    // trường hợp không có '?page' thì page = 1
    const page = +req.query.page || 1;

    // đếm số items;
    let totalItems = await Product.find({
        categoryId: catId,
        available: true
    }).countDocuments();

    const products = await Product.find({
            categoryId: catId,
            available: true
        })
        .sort({
            price: price
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
        queryUrl: req.session.queryUrl,
        sort: sort
    });
}



//Get thông tin sản phẩm
const getDetail = async (req, res, next) => {
    req.session.queryUrl = "";
    let message = req.flash('error');
    if (message.length > 0) {
        message = message[0];
    } else {
        message = null;
    }

    const prodId = req.params.productId;
    const product = await Product.findOne({
            _id: prodId
        })
        .populate({
            path: 'relatedProduct.productId'
        })
    product.view += 1;
    product.save();
    //console.log(product.relatedProduct[0].productId);

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
        queryUrl: req.session.queryUrl,
        errorMessage: message
    });
}

const addComment = (req, res, next) => {
    const prodId = req.params.productId;

    let newRate = new Rate();
    newRate.rating = req.body.rating;
    newRate.name = req.body.name;
    newRate.phoneNumber = req.body.phoneNumber;
    newRate.message = req.body.message;
    newRate.createdDate = new Date();

    newRate
        .save()
        .then(review => {
            Product.findById(prodId)
                .then(product => {
                    return product.addReview(review);
                })
                .then(result => {
                    //console.log(result);
                    req.flash('error', 'Thêm nhận xét!');
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
    //req.flash('error', 'Thêm sản phẩm vào giỏ hàng!');
    //res.redirect('/shop/' + prodId);
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