const login = (req, res, next) => {
    res.render('auth/login', {
        pageTitle: "Đăng nhập"
    });
}

const submitLogin = (req, res, next) => {

}

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
    login,
    submitLogin,
    register,
    submitRegister,
    forgorPw,
    submitForgorPw
}