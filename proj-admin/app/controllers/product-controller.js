// create
const get_add_product = (req, res, next) => {
    res.render('product-view/product-info');
}

const post_add_product = (req, res, next) => {
    res.render('product-view/product-info');
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