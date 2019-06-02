const passport = require('passport');
const User = require('../models/user');

const checkAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        next()
    } else {
        res.redirect('/login');
    }
};

const initLogin = (req, res, next) => {
    if (req.isAuthenticated()) {
        res.redirect('/home');
    } else {
        res.render('auth-view/login', {
            pageTitle: "Đăng nhập"
        });
    }
}

const login = passport.authenticate('local', {
    failureRedirect: '/login',
    successRedirect: '/home',
    failureFlash: true
})

const initRegister = (req, res, next) => {
    res.render('auth-view/register', {
        pageTitle: "Đăng ký"
    });
}

const register = (req, res, next) => {

}


const initForgot_pw = (req, res, next) => {
    res.render('auth-view/forgot-pw', {
        pageTitle: "Quên mật khẩu"
    });
}

const forgot_pw = (req, res, next) => {

}

//get profile info
const get_profile = (req, res, next) => {
    let userId = req.session.passport.user._id;
    User.findOne({
            _id: userId
        })
        .then(user => {
            if (!user) {
                console.log('ERROR PROFILE');
                return res.redirect('/');
            }
            res.render('user-view/user-info', {
                pageTitle: "Thông tin cá nhân",
                user
            });
        })
        .catch(err => console.log(err));
}

//posst to update profile
const update_profile = (req, res, next) => {
    let newUser = new User();
    newUser.userId = req.session.passport.user._id;
    newUser.name = req.body.name;
    newUser.username = req.body.username;
    newUser.email = req.body.email;
    newUser.phone = req.body.phone;
    newUser.address = req.body.address;
    newUser.description = req.body.description;
    newUser.available = req.body.available;
    newUser.dateCreated = req.body.dateCreated;

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
            user.dateCreated = newUser.dateCreated;

            if (image) {
                user.imageUrl = image.path;
                user.imageUrl = user.imageUrl.slice(7);
            }
            return user.save();
        })
        .then(result => {
            res.redirect('/profile');
            // res.redirect(req.get('referer'));
        })
        .catch(err => console.log(err));
}


const logout = (req, res, next) => {
    req.logout();
    res.redirect('/login');
};

module.exports = {
    checkAuth,
    initLogin,
    login,
    initRegister,
    register,
    initForgot_pw,
    forgot_pw,
    get_profile,
    update_profile,
    logout
}