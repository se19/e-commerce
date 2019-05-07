//Khởi tạo
const intialization = (req, res, next) => {
    res.render('home-view/home', {
        title: 'Admin'
    });

    getAmountStalls(req, res, next);
    getAmountUsers(req, res, next);
    getAmountOrders(req, res, next);
    getTopCatalogs(req, res, next);
    getTopProducts(req, res, next);
    getTopStalls(req, res, next);
    getNewUsers(req, res, next);
}

const getAmountStalls = (req, res, next) => {

}

const getAmountUsers = (req, res, next) => {

}

const getAmountOrders = (req, res, next) => {

}

const getTopCatalogs = (req, res, next) => {

}

const getTopProducts = (req, res, next) => {

}

const getTopStalls = (req, res, next) => {

}

const getNewUsers = (req, res, next) => {

}

module.exports = {
    intialization
}