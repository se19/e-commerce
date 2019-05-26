const passport = require('passport');
const User = require('../models/user');

const checkAuth = (req, res, next) => {
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
    if (req.isAuthenticated()) {
        res.redirect('/home');
    } else {
        res.render('auth-view/login');
    }
}

const login = passport.authenticate('local', {
    failureRedirect: '/login',
    successRedirect: '/home',
    failureFlash: true
})

const initRegister = (req, res, next) => {
    res.render('auth-view/register');
}

const register = (req, res, next) => {

}


const initForgot_pw = (req, res, next) => {
    res.render('auth-view/forgot-pw');
}

const forgot_pw = (req, res, next) => {

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
    logout
}