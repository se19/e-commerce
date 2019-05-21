const User = require('../models/user');

//get list
const list_users = (req, res, next) => {
    User.find()
        .then(users => {
            // console.log(users);
            res.render('user-view/user-list', {
                pageTitle: "Tài khoản người dùng",
                users
            });
        })
        .catch(err => console.log(err));
}


//get init user
const init_user = (req, res, next) => {
    res.render('user-view/user-info', {
        pageTitle: "Thêm người dùng",
        user: {}
    });
}

//post to create user
const create_user = (req, res, next) => {
    let newUser = new User();
    newUser.name = req.body.name;
    newUser.username = req.body.username;
    newUser.email = req.body.email;
    newUser.phone = req.body.phone;
    newUser.address = req.body.address;
    newUser.description = req.body.description;
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
            res.redirect('/users');
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
    newUser.userId = req.body.userId;
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
            res.redirect('/users');
        })
        .catch(err => console.log(err));
}

//post to delete
const delete_user = (req, res, next) => {
    let userId = req.body.userId;
    User.findByIdAndRemove(userId)
        .then(() => {
            console.log('DELETED USER');
            res.redirect('/users');
        })
        .catch(err => console.log(err));
}

module.exports = {
    list_users,
    init_user,
    create_user,
    get_user,
    update_user,
    delete_user
}