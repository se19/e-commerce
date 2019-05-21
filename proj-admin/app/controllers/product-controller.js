const Product = require('../models/product');
const Brand = require('../models/brand');
const Category = require('../models/category');

// create product
const get_add_product = async (req, res, next) => {
    let brands = await Brand.find();
    let categories = await Category.find();

    res.render('product-view/product-info', {
        pageTitle: "Thêm hàng hóa",
        editing: false,
        product: {},
        brands: brands,
        categories: categories
    });
}
const post_add_product = async (req, res, next) => {
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

// read list product 
const get_list_product = (req, res, next) => {
    Product.find()
        .populate('brandId')
        .populate('categoryId')
        //.execPopulate()
        .then(products => {
            console.log(products);
            res.render('product-view/product-list', {
                pageTitle: "Danh sách hàng hóa",
                prods: products
            });
        })
        .catch(err => console.log(err));
}

// update product 
const get_edit_product = async (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) {
        return res.redirect('/products');
    }
    let brands = await Brand.find();
    let categories = await Category.find();
    const prodId = req.params.productId;
    Product.findOne({
            productId: prodId
        })
        .populate('brandId')
        .populate('categoryId')
        .then(product => {
            if (!product) {
                return res.redirect('/products');
            }
            res.render('product-view/product-info', {
                pageTitle: product.title,
                editing: editMode,
                product: product,
                brands: brands,
                categories: categories
            });
        })
        .catch(err => console.log(err));
}

const post_edit_product = async (req, res, next) => {
    const productId = req.body.productId;
    const updateTitle = req.body.title;
    const updatePrice = req.body.price;
    const updateDescription = req.body.description;
    const image = req.file;
    const updatenumberInventory = req.body.numberInventory;
    let updateBrandId = await Brand.findOne({
        title: req.body.brand
    });
    let updateCategoryId = await Category.findOne({
        title: req.body.category
    });
    Product.findOne({
            productId: productId
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
const post_delete_product = (req, res, next) => {
    const prodId = req.body.pId;
    Product.findByIdAndRemove(prodId)
        .then(() => {
            console.log('DESTROYED PRODUCT');
            res.redirect('/products');
        })
        .catch(err => console.log(err));
}


module.exports = {
    get_add_product,
    post_add_product,
    get_list_product,
    get_edit_product,
    post_edit_product,
    post_delete_product
}