const Product = require('../models/product');
const Brand = require('../models/brand');
const Category = require('../models/category');


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
    newProduct.productId = req.body.productId;
    newProduct.title = req.body.title;
    newProduct.price = req.body.price;
    newProduct.description = req.body.description;
    newProduct.importDate = new Date().getDate();
    newProduct.numberInventory = req.body.numberInventory;
    newProduct.brandId = req.body.brandId;
    newProduct.categoryId = req.body.categoryId;
    newProduct.numberPurchased = 0;
    newProduct.average = 0;

    let image = req.file;

    if (!image) {
        console.log('Errrrrrrrrrrror');
    } else {
        newProduct.imageUrl = image.path;
        newProduct.imageUrl = newProduct.imageUrl.slice(7);
    }

    newProduct
        .save()
        .then(result => {
            console.log(result);
            console.log('Created Product');
            res.redirect('/products');
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
    Product.findOne({
            _id: productId
        })
        .populate('brandId')
        .populate('categoryId')
        .then(product => {
            if (!product) {
                return res.redirect('/products');
            }
            res.render('product-view/product-info', {
                pageTitle: product.title,
                product,
                brands,
                categories
            });
        })
        .catch(err => console.log(err));
}

// post to update product
const update_product = async (req, res, next) => {
    const productId = req.params.productId;
    const updateTitle = req.body.title;
    const updatePrice = req.body.price;
    const updateDescription = req.body.description;
    const image = req.file;
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
            if (image) {
                product.imageUrl = image.path;
                product.imageUrl = product.imageUrl.slice(7);
            }
            product.numberInventory = updatenumberInventory;
            product.brandId = updateBrandId;
            product.categoryId = updateCategoryId;
            return product.save();
        })
        .then(result => {
            console.log('UPDATED PRODUCT!');
            res.redirect('/products');
        })
        .catch(err => console.log(err));
}

// delete product
const delete_product = (req, res, next) => {
    const productId = req.body.productId;
    Product.findByIdAndRemove(productId)
        .then(() => {
            console.log('DESTROYED PRODUCT');
            res.redirect('/products');
        })
        .catch(err => console.log(err));
}


module.exports = {
    list_products,
    init_product,
    create_product,
    get_product,
    update_product,
    delete_product
}