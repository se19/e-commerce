const list_order = (req, res, next) => {
    res.render('order-view/order-list', {
        session: req.session
    });
}

const get_order = (req, res, next) => {
    res.render('order-view/order-info', {
        session: req.session
    });
}

const create_order = (req, res, next) => {
    res.render('order-view/order-info');
}

const update_order = (req, res, next) => {
    res.render('order-view/order-info');
}

const delete_order = (req, res, next) => {

}

module.exports = {
    list_order,
    get_order,
    create_order,
    update_order,
    delete_order
}