const login = (req, res, next) => {
    res.render('stall-view/stall-list');
}

const register = (req, res, next) => {
    res.render('stall-view/stall-info');
}

const forgorPw = (req, res, next) => {
    res.render('stall-view/stall-info');
}

module.exports = {
    login,
    register,
    forgorPw
}