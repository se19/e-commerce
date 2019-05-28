const User = require('../models/user');

//Get thông tin người dùng
const getIProfileFromSession = (req, res, next) => {
    res.render('user-view/update-info', {
        pageTitle: "Cập nhật thông tin",
        session: req.session
    });
}

//Cập nhật thông tin
const updateInfo = (req, res, next) => {
    let newUser = new User();
    newUser.userId = req.session.passport.user._id;
    newUser.name = req.body.name;
    newUser.email = req.body.email;
    newUser.phone = req.body.phone;
    newUser.address = req.body.address;

    // let image = req.file;

    User.updateOne({
            _id: newUser.userId
        }, {
            name: newUser.name,
            email: newUser.email,
            phone: newUser.phone,
            address: newUser.address
        })
        .then(result => {
            console.log('UPDATED USER');
            req.session.passport.user.name = newUser.name;
            req.session.passport.user.email = newUser.email;
            req.session.passport.user.phone = newUser.phone;
            req.session.passport.user.address = newUser.address;
            req.flash('update-success', 'Cập nhật thông tin thành công!');
            req.session.flash = req.flash('update-success');
            res.redirect('/user/profile');
        })
        .catch(err => console.log(err));
}

//Thay đổi mật khẩu
const changePw = (req, res, next) => {
    res.render('user-view/change-pw', {
        pageTitle: "Đổi mật khẩu",
        session: req.session
    });
}

module.exports = {
    getIProfileFromSession,
    // getInfo,
    updateInfo,
    changePw
}