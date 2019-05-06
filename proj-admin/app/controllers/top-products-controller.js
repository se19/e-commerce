const list_top_products = (req, res, next) => {
    res.render('top-products-view/top-products');
}

// const create_product = (req, res, next) => {
//     res.render('product-view/product-info');
// }

// const update_product = (req, res, next) => {
//     res.render('product-view/product-info');
// }

// const delete_product = (req, res, next) => {

// }

module.exports = {
    list_top_products
}