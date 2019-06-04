const User = require('../models/user');
const Order = require('../models/order');
const constants = require('../../constants/index');

//get admin list
const list_administrators = (req, res, next) => {
    let available = req.query.available;
    let params = {
        userType: constants.USERTYPE_ADMIN
    };
    if (available === 'true') {
        params.available = true;
    } else if (available === 'false') {
        params.available = false;
    }
    User.find(params)
        .then(users => {
            // console.log(users);
            res.render('user-view/user-list', {
                pageTitle: "Quản trị viên",
                userType: constants.USERTYPE_ADMIN,
                users,
                available: params.available
            });
        })
        .catch(err => console.log(err));
}
//get customer list
const list_customers = (req, res, next) => {
    let available = req.query.available;
    let params = {
        userType: constants.USERTYPE_CUSTOMER
    };
    if (available === 'true') {
        params.available = true;
    } else if (available === 'false') {
        params.available = false;
    }
    User.find(params)
        .then(users => {
            // console.log(users);
            res.render('user-view/user-list', {
                pageTitle: "Khách hàng",
                userType: constants.USERTYPE_CUSTOMER,
                users,
                available: params.available
            });
        })
        .catch(err => console.log(err));
}


//get init admin
const init_administrator = (req, res, next) => {
    let newDate = new Date();
    res.render('user-view/user-info', {
        pageTitle: "Thêm quản trị viên",
        user: {
            userType: constants.USERTYPE_ADMIN,
            dateCreated: newDate
        }
    });
}
//get init customer
const init_customer = (req, res, next) => {
    let newDate = new Date();
    res.render('user-view/user-info', {
        pageTitle: "Thêm khách hàng",
        user: {
            userType: constants.USERTYPE_CUSTOMER,
            dateCreated: newDate
        }
    });
}

//post to create user
const create_user = (req, res, next) => {
    let newUser = new User();
    newUser.name = req.body.name;
    newUser.username = req.body.username;
    newUser.email = req.body.email;
    newUser.password = req.body.password;
    newUser.phone = req.body.phone;
    newUser.address = req.body.address;
    newUser.description = req.body.description;
    newUser.userType = req.body.userType;
    newUser.dateCreated = req.body.dateCreated;
    if (req.body.available) {
        newUser.available = true;
    } else {
        newUser.available = false;
    }

    let image = req.file;

    if (!image) {
        console.log('Errrrrrrrrrrror Image');
    } else {
        newUser.imageUrl = image.path;
        newUser.imageUrl = newUser.imageUrl.slice(7);
    }

    newUser
        .save()
        .then(result => {
            console.log(result);
            console.log('INSERTED USER');
            let path = '';
            if (result.userType === constants.USERTYPE_ADMIN) {
                path = 'administrators'
            }
            if (result.userType === constants.USERTYPE_CUSTOMER) {
                path = 'customers'
            }
            res.redirect('/users/' + path + "/" + result.id);
            // res.redirect(req.get('referer'));
        })
        .catch(err => {
            console.log(err);
        });
}

//get user info
const get_user = async (req, res, next) => {
    let userId = req.params.userId;

    let orders;
    await Order.find({
            'user.userId': userId
        })
        .then(result => {
            console.log(result);
            orders = result;
        })
        .catch(err => console.log(err));
    await User.findOne({
            _id: userId
        })
        .then(user => {
            if (!user) {
                console.log('NOT FOUND USER');
                return res.redirect('/users');
            }
            res.render('user-view/user-info', {
                pageTitle: user.title,
                user,
                orders: orders,
                status: ""
            });
        })
        .catch(err => console.log(err));
}

//post to update user
const update_user = (req, res, next) => {
    let newUser = new User();
    newUser.userId = req.params.userId;
    newUser.name = req.body.name;
    newUser.username = req.body.username;
    newUser.email = req.body.email;
    newUser.phone = req.body.phone;
    newUser.address = req.body.address;
    newUser.description = req.body.description;
    if (req.body.available) {
        newUser.available = true;
    } else {
        newUser.available = false;
    }

    let image = req.file;

    User.findOne({
            _id: newUser.userId
        })
        .then(user => {
            user.name = newUser.name;
            user.username = newUser.username;
            user.email = newUser.email;
            user.phone = newUser.phone;
            user.address = newUser.address;
            user.description = newUser.description;
            user.available = newUser.available;

            if (image) {
                user.imageUrl = image.path;
                user.imageUrl = user.imageUrl.slice(7);
            }
            return user.save();
        })
        .then(result => {
            console.log('UPDATED USER');
            let path = '';
            if (result.userType === constants.USERTYPE_ADMIN) {
                path = 'administrators'
            }
            if (result.userType === constants.USERTYPE_CUSTOMER) {
                path = 'customers'
            }
            res.redirect('/users/' + path + "/" + result.id);
            // res.redirect(req.get('referer'));
        })
        .catch(err => console.log(err));
}

//post to delete
const delete_administrator = (req, res, next) => {
    let userId = req.params.userId;
    User.updateOne({
            _id: userId
        }, {
            available: false
        })
        .then(result => {
            console.log('DELETED ADMIN');
            res.redirect('/users/administrators');
        })
        .catch(err => console.log(err));
    // User.findByIdAndRemove(userId)
    //     .then(() => {
    //         console.log('DELETED ADMIN');
    //         res.redirect('/users/administrators');
    //     })
    //     .catch(err => console.log(err));
}

const delete_customer = (req, res, next) => {
    let userId = req.params.userId;
    User.updateOne({
            _id: userId
        }, {
            available: false
        })
        .then(result => {
            console.log('DELETED CUSTOMER');
            res.redirect('/users/customers');
        })
        .catch(err => console.log(err));
    // User.findByIdAndRemove(userId)
    //     .then(() => {
    //         console.log('DELETED CUSTOME');
    //         res.redirect('/users/customers');
    //     })
    //     .catch(err => console.log(err));
}

const reset_pw_customer = (req, res, next) => {
    let newUser = new User();
    newUser.userId = req.params.userId;
    newUser.userType = req.body.userType;

    if (newUser.userType === constants.USERTYPE_CUSTOMER) {
        User.findOne({
                _id: newUser.userId
            })
            .then(user => {
                user.password = constants.DEFAULT_CUSTOMER_PASSWORD;
                return user.save();
            })
            .then(result => {
                console.log('RESETED PASSWORD');
                res.redirect(req.get('referer'));
            })
            .catch(err => console.log(err));
    }
}

const upgrade_user = (req, res, next) => {
    let userId = req.params.userId;
    User.updateOne({
            _id: userId
        }, {
            userType: constants.USERTYPE_ADMIN
        })
        .then(result => {
            console.log('UPGRADED USER');
            res.redirect('/users/administrators/' + userId);
        })
        .catch(err => console.log(err));
}

module.exports = {
    list_administrators,
    list_customers,
    init_administrator,
    init_customer,
    create_user,
    get_user,
    update_user,
    delete_administrator,
    delete_customer,
    reset_pw_customer,
    upgrade_user
}