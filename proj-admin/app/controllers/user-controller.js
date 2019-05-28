const User = require('../models/user');
const constants = require('../../constants/index');

//get admin list
const list_administrators = (req, res, next) => {
    User.find({
            userType: constants.USERTYPE_ADMIN
        })
        .then(users => {
            // console.log(users);
            res.render('user-view/user-list', {
                pageTitle: "Quản trị viên",
                userType: constants.USERTYPE_ADMIN,
                users
            });
        })
        .catch(err => console.log(err));
}
//get customer list
const list_customers = (req, res, next) => {
    User.find({
            userType: constants.USERTYPE_CUSTMER
        })
        .then(users => {
            // console.log(users);
            res.render('user-view/user-list', {
                pageTitle: "Khách hàng",
                userType: constants.USERTYPE_CUSTMER,
                users
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
            userType: constants.USERTYPE_CUSTMER,
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
    newUser.available = req.available;

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
            if (result.userType === constants.USERTYPE_CUSTMER) {
                path = 'customers'
            }
            res.redirect('/users/' + path);
        })
        .catch(err => {
            console.log(err);
        });
}

//get user info
const get_user = (req, res, next) => {
    let userId = req.params.userId;
    User.findOne({
            _id: userId
        })
        .then(user => {
            if (!user) {
                console.log('NOT FOUND USER');
                return res.redirect('/users');
            }
            res.render('user-view/user-info', {
                pageTitle: user.title,
                user
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
    newUser.available = req.body.available;

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
            if (result.userType === constants.USERTYPE_CUSTMER) {
                path = 'customers'
            }
            res.redirect('/users/' + path);
        })
        .catch(err => console.log(err));
}

//post to delete
const delete_administrator = (req, res, next) => {
    let userId = req.body.userId;
    User.findByIdAndRemove(userId)
        .then(() => {
            console.log('DELETED ADMIN');
            res.redirect('/users/administrators');
        })
        .catch(err => console.log(err));
}

const delete_customer = (req, res, next) => {
    let userId = req.body.userId;
    User.findByIdAndRemove(userId)
        .then(() => {
            console.log('DELETED CUSTOME');
            res.redirect('/users/customers');
        })
        .catch(err => console.log(err));
}

const reset_pw_customer = (req, res, next) => {
    let newUser = new User();
    newUser.userId = req.body.userId;
    newUser.userType = req.body.userType;

    if (newUser.userType === customerType) {
        User.findOne({
                _id: newUser.userId
            })
            .then(user => {
                user.password = constants.DEFAULT_CUSTOMER_PASSWORD;
                return user.save();
            })
            .then(result => {
                console.log('RESETED PASSWORD');
                res.redirect('/users/customers');
            })
            .catch(err => console.log(err));
    }
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
    reset_pw_customer
}