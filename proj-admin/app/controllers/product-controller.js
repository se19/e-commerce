const Product = require('../models/product');
const Brand = require('../models/brand');
const Category = require('../models/category');

// create product
const get_add_product = async (req, res, next) => {
    let brands = await Brand.find();
    let categories = await Category.find();
    res.render('product-view/product-info', {
        editing: false,
        product: {},
        brands: brands,
        categories: categories
    });
}
const post_add_product = async (req, res, next) => {
    const productId = req.body.productId;
    const title = req.body.title;
    const price = req.body.price;
    const description = req.body.description;
    const image = req.file;
    const importDate = new Date().getDate();
    const numberInventory = req.body.numberInventory;
    let brandId = await Brand.findOne({
        title: req.body.brand
    });
    let categoryId = await Category.findOne({
        title: req.body.category
    });

    if (!image) {
        console.log('Errrrrrrrrrrror');
    }
    let imageUrl = image.path;
    imageUrl = imageUrl.slice(7);

    const product = new Product({
        productId: productId,
        title: title,
        price: price,
        description: description,
        imageUrl: imageUrl,
        importDate: importDate,
        brandId: brandId,
        categoryId: categoryId,
        numberInventory: numberInventory,
        numberPurchased: 0,
        average: 0,
    });
    product
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