const passport = require('passport');
const User = require('../models/user');

const checkAuth = (req, res, next) => {
    //req.isAuthenticated() will return true if user is logged in
    if (req.isAuthenticated()) {
        //Save user login to session
        let user = new User();
        user.name = req.user.name;
        user.username = req.user.username;
        user.email = req.user.email;
        user.imageUrl = req.user.imageUrl;

        req.session.currentUser = user;
        next()
    } else {
        res.redirect('/login');
    }
};

const initLogin = (req, res, next) => {
    //req.isAuthenticated() will return true if user is logged in
    if (req.isAuthenticated()) {
        res.redirect('/');
    } else {
         res.render('auth/login', {
             pageTitle: "Đăng nhập"
         });
    }
}

const login = passport.authenticate('local', {
    failureRedirect: '/login',
    successRedirect: '/',
    failureFlash: true
})


// const login = (req, res, next) => {
//     res.render('auth/login', {
//         pageTitle: "Đăng nhập"
//     });
// }

// const submitLogin = (req, res, next) => {

// }

const register = (req, res, next) => {
    res.render('auth/register', {
        pageTitle: "Đăng ký"
    });
}

const submitRegister = (req, res, next) => {

}

const forgorPw = (req, res, next) => {
    res.render('auth/forgot', {
        pageTitle: "Quên mật khẩu"
    });
}

const submitForgorPw = (req, res, next) => {

}


module.exports = {
    checkAuth,
    initLogin,
    login,
    //submitLogin,
    register,
    submitRegister,
    forgorPw,
    submitForgorPw
}