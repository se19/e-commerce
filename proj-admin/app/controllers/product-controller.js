const Product = require('../models/product');
const Brand = require('../models/brand');
const Category = require('../models/category');

// create
const get_add_product = (req, res, next) => {
    res.render('product-view/product-info', {
        editing: false
    });
}

const post_add_product = async (req, res, next) => {
    const productId = req.body.productId;
    const title = req.body.title;
    const price = req.body.price;
    const description = req.body.description;
    const image = req.file;
    const importDate = new Date().getDate();
    //let brandId = req.body.brand;
    //let categoryId = req.body.category;
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
    //console.log(product);
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

// read
const get_list_product = (req, res, next) => {
    res.render('product-view/product-list');
}

// update
const get_edit_product = (req, res, next) => {
    res.render('product-view/product-info');
}

const post_edit_product = (req, res, next) => {
    res.render('product-view/product-info');
}

// delete
const post_delete_product = (req, res, next) => {
    res.render('product-view/product-info');
}


module.exports = {
    get_add_product,
    post_add_product,
    get_list_product,
    get_edit_product,
    post_edit_product,
    post_delete_product
}