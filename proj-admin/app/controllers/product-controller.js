const Product = require('../models/product');
const Brand = require('../models/brand');
const Category = require('../models/category');
const Rate = require('../models/rate');
const fileHelper = require('../../util/file');

const ITEMS_PER_PAGE = 6;
const REVIEWS_PER_PAGE = 2;

// read list product 
const list_products = (req, res, next) => {
    Product.find()
        .populate('brandId')
        .populate('categoryId')
        //.execPopulate()
        .then(products => {
            // console.log(products);
            res.render('product-view/product-list', {
                pageTitle: "Danh sách hàng hóa",
                products
            });
        })
        .catch(err => console.log(err));
}

// initialize product
const init_product = async (req, res, next) => {
    let brands = await Brand.find();
    let categories = await Category.find();

    res.render('product-view/product-info', {
        pageTitle: "Thêm hàng hóa",
        product: {},
        brands,
        categories
    });
}

// post to create product
const create_product = async (req, res, next) => {
    let newProduct = new Product();
    newProduct.title = req.body.title;
    newProduct.price = req.body.price;
    newProduct.description = req.body.description;
    newProduct.importDate = Date(Date.now());
    newProduct.numberInventory = req.body.numberInventory;
    newProduct.brandId = req.body.brandId;
    newProduct.categoryId = req.body.categoryId;
    newProduct.numberPurchased = 0;
    newProduct.view = 0;
    newProduct.average = 0;

    let images = req.files;

    if (!images) {
        console.log('Errrrrrrrrrrror');
    } else {
        //Auto set ảnh đầu tiên làm hình ảnh chính 
        if (images.length > 0) {
            let imageUrl = images[0].path;
            imageUrl = imageUrl.slice(7);
            newProduct.imageUrl = imageUrl;
        }
        //Lưu tất cả ảnh vào 1 mảng
        images.forEach(image => {
            let imageUrl = {
                image: image.path
            };
            imageUrl.image = imageUrl.image.slice(7);
            newProduct.imageDescription.unshift(imageUrl);
        });
    }
    //console.log(images);
    newProduct
        .save()
        .then(result => {
            console.log(result);
            console.log('Created Product');
            res.redirect('/products/' + result.id);
        })
        .catch(err => {
            console.log(err);
        });
}

// get product info
const get_product = async (req, res, next) => {
    let brands = await Brand.find();
    let categories = await Category.find();
    const productId = req.params.productId;
    let product = new Product();

    await Product.findOne({
            _id: productId
        })
        .populate('brandId')
        .populate('categoryId')
        .then(result => {
            if (!result) {
                return res.redirect('/products');
            }
            product = result;
        })
        .catch(err => console.log(err));

    if (product) {
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
        // .skip((page - 1) * REVIEWS_PER_PAGE) // bỏ qua ~ item
        // .limit(REVIEWS_PER_PAGE);


        await res.render('product-view/product-info', {
            pageTitle: product.title,
            product,
            brands,
            categories,
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
}

// post to update product
const update_product = async (req, res, next) => {
    const productId = req.params.productId;
    const updateTitle = req.body.title;
    const updatePrice = req.body.price;
    const updateDescription = req.body.description;
    const newImages = req.files;
    const updatenumberInventory = req.body.numberInventory;
    let updateBrandId = await Brand.findOne({
        _id: req.body.brandId
    });
    let updateCategoryId = await Category.findOne({
        _id: req.body.categoryId
    });
    Product.findOne({
            _id: productId
        })
        .then(product => {
            product.title = updateTitle;
            product.price = updatePrice;
            product.description = updateDescription;
            if (newImages) {
                //Nếu hình ảnh rỗng -> auto set ảnh đầu tiên làm hình ảnh chính 
                if (product.imageDescription.length === 0 && newImages.length > 0) {
                    let imageUrl = newImages[0].path;
                    imageUrl = imageUrl.slice(7);
                    product.imageUrl = imageUrl;
                }
                newImages.forEach(image => {
                    let imageUrl = {
                        image: image.path
                    };
                    imageUrl.image = imageUrl.image.slice(7);
                    product.imageDescription.unshift(imageUrl);
                });
            }
            product.numberInventory = updatenumberInventory;
            product.brandId = updateBrandId;
            product.categoryId = updateCategoryId;
            return product.save();
        })
        .then(result => {
            console.log('UPDATED PRODUCT!');
            res.redirect(req.get('referer'));
        })
        .catch(err => console.log(err));
}

// delete product
const delete_product = (req, res, next) => {
    const productId = req.body.productId;
    Product.findById(productId)
        .then(product => {
            fileHelper.deleteFile('public\\' + product.imageUrl);
            for (let img of product.imageDescription) {
                fileHelper.deleteFile('public\\' + img);
                console.log('public\\' + img);
            }
            return Product.findByIdAndRemove(productId);
        })
        .then(() => {
            console.log('DESTROYED PRODUCT');
            res.redirect('/products');
        })
        .catch(err => console.log(err));
}

// set default image product
const set_default_image = (req, res, next) => {
    let productId = req.params.productId;
    let imageId = req.body.imageId;

    Product.findOne({
            _id: productId
        })
        .then(product => {
            let item = product.imageDescription.find(item => item.id == imageId);
            if (item) {
                product.imageUrl = item.image;
            }
            return product.save();
        })
        .then(result => {
            console.log('SET DEFAULT PRODUCT!');
            res.json({
                product: result
            })
        })
        .catch(err => console.log(err));
}

// delete image from product
const delete_image = (req, res, next) => {
    let productId = req.params.productId;
    let imageId = req.body.imageId;
    let item;
    Product.findOne({
            _id: productId
        })
        .then(product => {
            item = product.imageDescription.find(item => item.id == imageId);
            if (item) {
                if (item.image == product.imageUrl) {
                    product.imageUrl = null;
                }
                fileHelper.deleteFile('public\\' + item.image);
                product.imageDescription = product.imageDescription.filter(item => item.id != imageId);
            }
            return product.save();
        })
        .then(result => {
            console.log('DELETED IMAGE!');
            res.json({
                image: item
            })
            // res.redirect('/products');
        })
        .catch(err => console.log(err));
}

// post to create or update review
const create_update_review = (req, res, next) => {
    let productId = req.params.productId;
    let reviewId = req.body.reviewId;
    let reviewName = req.body.name;
    let reviewPhoneNumber = req.body.phoneNumber;
    let reviewMessage = req.body.message;
    // let reviewCreatedDate = req.body.createdDate;

    if (reviewId) {
        //update
        Rate.updateOne({
                _id: reviewId
            }, {
                name: reviewName,
                phoneNumber: reviewPhoneNumber,
                message: reviewMessage
            })
            .then(result => {
                console.log('UPDATED REVIEW');
                res.redirect('/products/' + productId);
            })
            .catch(err => console.log(err));

    } else {
        Product.findOne({
                _id: productId
            })
            .then(product => {
                if (product) {
                    if (!product.reviews) {
                        product.reviews = [];
                    }
                    //create
                    let newReview = new Rate();
                    newReview.name = reviewName;
                    newReview.phoneNumber = reviewPhoneNumber;
                    newReview.message = reviewPhoneNumber;
                    newReview.createdDate = new Date();

                    newReview.save()
                        .then(review => {
                            if (review) {
                                product.reviews.unshift(review);
                            }
                            return product.save();
                        })
                        .then(result => {
                            console.log(result);
                            res.redirect('/products/' + productId);
                        })
                        .catch(err => {
                            console.log(err);
                        });
                }
            })
            .catch(err => console.log(err));
    }

}

// post to delete review
const delete_review = async (req, res, next) => {
    let productId = req.params.productId;
    let reviewId = req.body.reviewId;
    await Rate.findById(reviewId)
        .then(rate => {
            if (rate) {
                return Rate.findByIdAndRemove(rate.id);
            }
        })
        .then(() => {
            console.log('DELETED ORDER');
        })
        .catch(err => console.log(err));

    await Product.findOne({
            _id: productId
        })
        .then(product => {
            if (product) {
                if (reviewId) {
                    product.reviews.forEach((review, index) => {
                        if (review.toString() === reviewId) {
                            product.reviews = product.reviews.filter(item => item != reviewId);
                        }
                    });
                }
            }
            return product.save();
        })
        .then(result => {
            console.log('UPDATED PRODUCT!');
            res.redirect(req.get('referer'));
        })
        .catch(err => console.log(err));
}



module.exports = {
    list_products,
    init_product,
    create_product,
    get_product,
    update_product,
    delete_product,
    set_default_image,
    delete_image,
    create_update_review,
    delete_review
}