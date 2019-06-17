const User = require('../models/user');
const bcrypt = require('bcrypt');

//Get thông tin người dùng
const getProfile = (req, res, next) => {
    res.render('user-view/update-info', {
        pageTitle: "Cập nhật thông tin"
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
            // req.flash('update-success', 'Cập nhật thông tin thành công!');
            // res.locals.data.flash = req.flash('update-success');
            res.redirect('/user/profile');
        })
        .catch(err => console.log(err));
}

//Thay đổi mật khẩu
const getChangePw = (req, res, next) => {
    res.render('user-view/change-pw', {
        pageTitle: "Đổi mật khẩu"
    });
}

const postChangePw = async (req, res, next) => {
    const oldPw = req.body.oldPw;
    const newPw = req.body.newPw;
    const reNewPw = req.body.reNewPw;

    if (newPw != reNewPw) {
        console.log('Mật khẩu mới không khớp');
        return res.redirect('/change-pw');
    }

    User.findById(req.session.passport.user._id)
        .then(user => {
            if (!user) {
                console.log('NOT FOUND USER');
                //req.flash('error', 'Người dùng không tồn tại!');
                res.redirect('/');
            } else {
                bcrypt.compare(oldPw, user.password, function (err, response) {
                    if (response === true) {
                        bcrypt.hash(newPw, 10, function (err, hash) {
                            if (err) {
                                return;
                            }
                            user.password = hash;
                            user.save().then(result => {
                                    //req.flash('success', 'Cập nhật thành công!');
                                    res.redirect('/user/change-pw');
                                })
                                .catch(err => {
                                    console.log(err);
                                    //req.flash('error', 'Lỗi!')
                                });
                        })
                    } else {
                        //req.flash('error', 'Sai mật khẩu cũ!');
                        res.redirect('/user/change-pw');
                    }
                });
            }
        })
        .catch(err => {
            console.log(err);
            //req.flash('error', 'Lỗi!')
        });
}

module.exports = {
    getProfile,
    updateInfo,
    getChangePw,
    postChangePw
}