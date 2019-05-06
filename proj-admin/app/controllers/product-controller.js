const list_product = (req, res, next) => {
    res.render('product-view/product-list');
}

const get_product = (req, res, next) => {
    res.render('product-view/product-info');
}

const create_product = (req, res, next) => {
    res.render('product-view/product-info');
}

const update_product = (req, res, next) => {
    res.render('product-view/product-info');
}

const delete_product = (req, res, next) => {

}

module.exports = {
    list_product,
    get_product,
    create_product,
    update_product,
    delete_product
}