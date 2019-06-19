const passport = require('passport');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const async = require('async');
const crypto = require('crypto');
const User = require('../models/user');
const Order = require('../models/order');

const checkAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        next()
    } else {
        res.redirect('/login');
    }
};

const initLogin = (req, res, next) => {
    //get notification
    res.locals.message = req.flash();

    if (req.isAuthenticated()) {
        res.redirect('/home');
    } else {
        res.render('auth-view/login', {
            pageTitle: "Đăng nhập"
        });
    }
}

const login = passport.authenticate('local', {
    failureRedirect: '/login/failure',
    successRedirect: '/home',
    failureFlash: true
})

const login_failed = (req, res, next) => {
    req.flash('error', 'Đăng nhập thất bại! Vui lòng kiểm tra lại.');
    res.redirect('/login');
}

const initRegister = (req, res, next) => {
    res.render('auth-view/register', {
        pageTitle: "Đăng ký"
    });
}

const register = (req, res, next) => {

}


const init_forgot_pw = (req, res, next) => {
    //get notification
    res.locals.message = req.flash();

    res.render('auth-view/forgot-pw', {
        pageTitle: "Quên mật khẩu"
    });
}

const forgot_pw = (req, res, next) => {
    async.waterfall([
        function (done) {
            crypto.randomBytes(20, function (err, buf) {
                var token = buf.toString('hex');
                done(err, token);
            });
        },
        function (token, done) {
            User.findOne({
                email: req.body.email
            }, function (err, user) {
                if (!user) {
                    req.flash('error', 'Email không khớp với bất kì tài khoản nào!');
                    return res.redirect('/forgot-password');
                }

                User.updateOne({
                        email: req.body.email
                    }, {
                        resetPasswordToken: token,
                        resetPasswordExpires: Date.now() + 3600000 // 1 hour
                    })
                    .then(result => {
                        done(err, token, user);
                    })
                    .catch(err => console.log(err));
            });
        },
        function (token, user, done) {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'thi174hcmus@gmail.com',
                    pass: 'egrybyczwxjbfyqo' //mật khẩu ứng dụng của google https://myaccount.google.com/apppasswords
                }
            });
            transporter.verify(function (error, success) {
                if (error) {
                    console.log(error);
                } else {
                    const mailOptions = {
                        to: user.email,
                        from: 'support-team@gmail.com',
                        subject: 'Xác nhận yêu cầu khôi phục mật khẩu cho tài khoản liên kết.',
                        text: 'Bạn nhận được thư này bởi vì bạn (hoặc một ai đó) đã yêu cầu khôi phục mật khẩu cho tài khoản của bạn.\n\n' +
                            'Vui lòng nhấn vào đường dẫn bên dưới, hoặc dán vào trình duyệt để tiếp tục quá trình khôi phục:\n\n' +
                            'http://' + req.headers.host + '/forgot-password/reset/' + token + '\n\n' +
                            'Nếu không phải là bạn, vui lòng bỏ qua thư này và mật khẩu của bạn không bị thay đổi.\n'
                    };
                    transporter.sendMail(mailOptions, function (err) {
                        req.flash('success', 'Email đã được gửi, truy cập vào hòm thư ' + user.email + ' để xác nhận. (Kiểm tra mục thùng rác nếu không tìm thấy)');
                        res.redirect('/login');
                        done(err, 'done');
                    });
                }
            });
        }
    ], function (err) {
        if (err) return next(err);
        res.redirect('/forgot-password');
    });
}

const init_reset_pw = (req, res, next) => {
    //get notification
    res.locals.message = req.flash();

    const token = req.params.token;

    res.render('auth-view/reset-pw', {
        pageTitle: "Khôi phục mật khẩu",
        token
    });
}

const reset_pw = (req, res, next) => {
    const token = req.params.token;
    const newPw = req.body.newPw;
    const replacePw = req.body.replacePw;
    if (newPw !== replacePw) {
        req.flash('error', 'Mật khẩu không khớp!');
        return res.redirect('/forgot-pw/reset/' + token);
    }

    User.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: {
            $gt: Date.now()
        }
    }, function (err, user) {
        if (!user) {
            req.flash('error', 'Đường dẫn không hợp lệ hoặc đã hết hạn.');
            return res.redirect('/forgot-password');
        }

        user.password = newPw;
        user.resetPasswordExpires = Date.now();
        user.save().then(result => {
                req.flash('success', 'Đặt lại khẩu khẩu thành công!');
                res.redirect('/login');
            })
            .catch(err => {
                console.log(err);
                req.flash('error', 'Lỗi!')
            });

    });
}

//get profile info
const get_profile = async (req, res, next) => {
    //get notification
    res.locals.message = req.flash();

    let userId = req.session.passport.user._id;
    let orders;
    await Order.find({
            'user.userId': userId
        })
        .then(result => {
            console.log(result);
            orders = result;
        })
        .catch(err => console.log(err));
    await User.findOne({
            _id: userId
        })
        .then(user => {
            if (!user) {
                console.log('ERROR PROFILE');
                return res.redirect('/');
            }
            res.render('user-view/user-info', {
                pageTitle: "Thông tin cá nhân",
                user,
                orders,
                status: ""
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
    newUser.dateCreated = req.body.dateCreated;

    if (req.body.available) {
        newUser.available = true;
    } else {
        newUser.available = false;
    }

    let image = req.file;

    User.findOne({
            _id: newUser.userId
        })
        .then(user => {
            if (!user) {
                console.log('NOT FOUND USER');
                return res.redirect('/');
            }
            if (image) {
                newUser.imageUrl = image.path;
                newUser.imageUrl = newUser.imageUrl.slice(7);
            } else {
                newUser.imageUrl = user.imageUrl;
            }
            User.updateOne({
                    _id: newUser.userId
                }, {
                    name: newUser.name,
                    username: newUser.username,
                    email: newUser.email,
                    phone: newUser.phone,
                    address: newUser.address,
                    imageUrl: newUser.imageUrl,
                    description: newUser.description,
                    // available: newUser.available,
                    dateCreated: newUser.dateCreated
                })
                .then(result => {
                    console.log('UPDATED USER');
                    req.session.passport.user.name = newUser.name;
                    req.session.passport.user.username = newUser.username;
                    req.session.passport.user.email = newUser.email;
                    req.session.passport.user.phone = newUser.phone;
                    req.session.passport.user.address = newUser.address;
                    req.session.passport.user.description = newUser.description;
                    req.session.passport.user.imageUrl = newUser.imageUrl;
                    req.session.passport.user.available = newUser.available;
                    req.session.passport.user.dateCreated = newUser.dateCreated;

                    req.flash('success', 'Lưu thông tin cá nhân thành công!')
                    res.redirect('/profile');
                })
                .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
}


const init_change_password = (req, res, next) => {
    //get notification
    res.locals.message = req.flash();

    res.render('auth-view/change-pw', {
        pageTitle: "Thay đổi mật khẩu",
    });
};

const change_password = (req, res, next) => {

    const oldPw = req.body.oldPw;
    const newPw = req.body.newPw;
    const replacePw = req.body.replacePw;
    if (newPw !== replacePw) {
        req.flash('error', 'Mật khẩu mới không khớp!');
        return res.redirect('/change-pw');
    }
    User.findOne({
            _id: res.locals.userLogin._id
        })
        .then(user => {
            if (!user) {
                console.log('NOT FOUND USER');
                req.flash('error', 'Người dùng không tồn tại!');
                res.redirect('/');
            } else {
                bcrypt.compare(oldPw, user.password, function (err, response) {
                    if (response === true) {
                        user.password = newPw;
                        user.save().then(result => {
                                req.flash('success', 'Cập nhật thành công!');
                                res.redirect('/change-pw');
                            })
                            .catch(err => {
                                console.log(err);
                                req.flash('error', 'Lỗi!')
                            });
                    } else {
                        req.flash('error', 'Sai mật khẩu cũ!');
                        res.redirect('/change-pw');
                    }
                });
            }
        })
        .catch(err => {
            console.log(err);
            req.flash('error', 'Lỗi!')
        });

};

const logout = (req, res, next) => {
    req.logout();
    res.redirect('/login');
};

module.exports = {
    checkAuth,
    initLogin,
    login,
    login_failed,
    initRegister,
    register,
    init_forgot_pw,
    forgot_pw,
    init_reset_pw,
    reset_pw,
    get_profile,
    update_profile,
    init_change_password,
    change_password,
    logout
}