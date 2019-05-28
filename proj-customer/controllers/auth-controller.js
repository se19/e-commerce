const passport = require('passport');
const User = require('../models/user');

const checkAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        next()
    } else {
        res.redirect('/login');
    }
};

const initlogin = (req, res, next) => {
    if (req.isAuthenticated()) {
        res.redirect('/');
    } else {
        res.render('auth/login', {
            pageTitle: "Đăng nhập",
            session: req.session
        });
    }
}

const submitLogin = passport.authenticate('local', {
    failureRedirect: '/login',
    successRedirect: '/',
    failureFlash: true
})

const register = (req, res, next) => {
    if (req.isAuthenticated()) {
        res.redirect('/');
    } else {
        res.render('auth/register', {
            pageTitle: "Đăng ký",
            session: req.session
        });
    }
}

const submitRegister = (req, res, next) => {
    let newUser = new User();
    newUser.name = req.body.name;
    newUser.username = req.body.username;
    newUser.email = req.body.email;
    newUser.password = req.body.password;
    newUser.phone = req.body.phone;
    newUser.userType = 'customer';
    newUser.dateCreated = new Date();

    newUser
        .save()
        .then(user => {
            console.log(user);
            console.log('REGISTER USER');
            res.redirect('/login');
        })
        .catch(err => {
            console.log(err);
        });
}

const forgorPw = (req, res, next) => {
    if (req.isAuthenticated()) {
        res.redirect('/');
    } else {
        res.render('auth/forgot', {
            pageTitle: "Quên mật khẩu",
            session: req.session
        });
    }
}

const submitForgorPw = (req, res, next) => {

}

const logout = (req, res, next) => {
    req.logout();
    res.redirect('/login');
}


module.exports = {
    checkAuth,
    initlogin,
    submitLogin,
    register,
    submitRegister,
    forgorPw,
    submitForgorPw,
    logout
}