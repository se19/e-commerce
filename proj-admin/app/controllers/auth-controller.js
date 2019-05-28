const passport = require('passport');

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