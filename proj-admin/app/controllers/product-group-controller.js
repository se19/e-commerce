const list_product_group = (req, res, next) => {
    res.render('product-group-view/products-group-list');
}

const get_product_group = (req, res, next) => {
    res.render('product-group-view/product-group-info');
}

const create_product_group = (req, res, next) => {
    res.render('product-group-view/product-group-info');
}

const update_product_group = (req, res, next) => {
    res.render('product-group-view/product-group-info');
}

const delete_product_group = (req, res, next) => {

}

module.exports = {
    list_product_group,
    get_product_group,
    create_product_group,
    update_product_group,
    delete_product_group
}