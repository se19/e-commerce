//Import constant list
var constants = require('../constants/index');
const Brand = require('../app/models/brand');
const Category = require('../app/models/category');

const locals = async (req, res, next) => {
    if (!res.locals.constants) {
        res.locals.constants = constants;
    }
    if (!res.locals.userLogin) {
        if (req.session && req.session.passport && req.session.passport.user) {
            res.locals.userLogin = req.session.passport.user;
        }
    }
    res.locals.session = req.session;
    if (!res.locals.brands) {
        await Brand.find()
            .then(brands => {
                if (brands) {
                    res.locals.brands = brands;
                }
            })
            .catch(err => console.log(err));
    }
    if (!res.locals.categories) {
        await Category.find()
            .then(categories => {
                if (categories) {
                    res.locals.categories = categories;
                }
            })
            .catch(err => console.log(err));
    }

    next();
}

module.exports = locals;