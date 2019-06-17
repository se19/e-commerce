const sgMail = require('@sendgrid/mail');
const crypto = require('crypto');
const passport = require('passport');
const bcrypt = require('bcrypt');
const User = require('../models/user');

// thay vì dùng tài khoản google + nodemailer thì dùng api_key, tương tự nhau
sgMail.setApiKey('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');

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
        let message = req.flash('error');
        if (message.length > 0) {
            message = message[0];
        } else {
            message = null;
        }
        res.render('auth/login', {
            pageTitle: "Đăng nhập",
            errorMessage: message
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
        let message = req.flash('error');
        if (message.length > 0) {
            message = message[0];
        } else {
            message = null;
        }
        res.render('auth/register', {
            pageTitle: "Đăng ký",
            errorMessage: message
        });
    }
}

const submitRegister = async (req, res, next) => {
    const token = await crypto.randomBytes(32).toString('hex');

    let newUser = new User();
    newUser.username = req.body.username;
    newUser.password = req.body.password;
    newUser.name = req.body.name;
    newUser.email = req.body.email;
    newUser.phone = req.body.phone;
    newUser.userType = 'customer';
    newUser.dateCreated = new Date();
    newUser.available = false;
    newUser.resetPasswordToken = token;
    newUser.resetPasswordExpires = Date.now() + 3600000; // milisecond

    User.findOne({
            username: newUser.username
        }).then(user => {
            if (user) {
                req.flash('error', 'Tài khoản đã tồn tại');
                return res.redirect('/register');
            }
        })
        .catch(err => {
            console.log(err);
        });


    bcrypt.hash(newUser.password, 10, function (err, hash) {
        if (err) {
            return;
        }
        newUser.password = hash;
        newUser
            .save()
            .then(user => {
                //console.log(user);
                console.log('REGISTER USER');
                const msg = {
                    to: user.email,
                    from: 'mrla4321@gmail.com',
                    subject: 'Password reset',
                    html: `
            <p> Nhấn vào đường dẫn sau <a href="http://localhost:3000/active/${token}"> link để kích hoạt tài khoản </a>.</p>`
                }
                sgMail.send(msg);
                console.log("Gửi mail kích hoat!!!!");
                req.flash('error', 'Tạo thành công, truy cập email để kích hoạt');
                res.redirect('/login');
            })
            .catch(err => {
                console.log(err);
            });
    })
}


const forgorPw = (req, res, next) => {
    if (req.isAuthenticated()) {
        res.redirect('/');
    } else {
        let message = req.flash('error');
        if (message.length > 0) {
            message = message[0];
        } else {
            message = null;
        }
        res.render('auth/forgot', {
            pageTitle: "Quên mật khẩu",
            errorMessage: message
        });
    }
}

const submitForgorPw = async (req, res, next) => {
    let user = await User.findOne({
        email: req.body.email
    })

    if (user.googleId) {
        console.log("Tài khoản được đăng nhập bằng google");
        return res.redirect('/forgot');
    }

    // tạo token ngẫu nhiên
    crypto.randomBytes(32, (err, buffer) => {
        if (err) {
            console.log(err);
            return res.redirect('/forgot');
        }
        const token = buffer.toString('hex');
        User.updateOne({
                email: req.body.email
            }, {
                resetPasswordToken: token,
                resetPasswordExpires: Date.now() + 3600000 // milisecond
            })
            .then(result => {
                const msg = {
                    to: req.body.email,
                    from: 'ecommerce.se19@gmail.com',
                    subject: 'Password reset',
                    html: `
            <p>Bạn yêu cầu đổi mật khẩu</p>
            <p>Nhấn vào đường dẫn sau <a href="http://localhost:3000/forgot/reset/${token}" > link </a> để đổi mật khẩu.</p> `
                }
                sgMail.send(msg);
                res.redirect('/login');
            })
            .catch(err => {
                console.log(err);
            });
    });
}

const getNewPw = (req, res, next) => {
    const token = req.params.token;
    User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: {
                $gt: Date.now()
            }
        })
        .then(user => {
            res.render('auth/new-password', {
                pageTitle: 'Mật khẩu mới',
                userId: user._id.toString(),
                passwordToken: token
            });
        })
        .catch(err => {
            console.log(err);
        });
}

const postNewPw = async (req, res, next) => {
    const newPassword = req.body.password;
    const userId = req.body.userId;
    const passwordToken = req.body.passwordToken;

    let user = await User.findOne({
        resetPasswordToken: passwordToken,
        resetPasswordExpires: {
            $gt: Date.now()
        },
        _id: userId
    })
    //console.log(user);
    bcrypt.hash(newPassword, 10, function (err, hash) {
        if (err) {
            return;
        }
        user.password = hash;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        user.save()
            .then(result => {
                res.redirect('/login');
            })
            .catch(err => {
                console.log(err);
            });
    })
}

const activeNewUser = (req, res, next) => {
    const token = req.params.token;
    User.updateOne({
            resetPasswordToken: token,
            resetPasswordExpires: {
                $gt: Date.now()
            }
        }, {
            available: true,
            resetPasswordToken: undefined,
            resetPasswordExpires: undefined
        })
        .then(result => {
            console.log("Active successfully");
            res.redirect('/login');
        })
        .catch(err => {
            console.log(err);
        });
}

const getSelector = () => {
    passport.authenticate('google', {
        scope: ["profile"]
    });
}

const getAuthenticateByGoogle = (req, res, next) => {
    passport.authenticate('google', {
            failureRedirect: "/login"
        },
        function (req, res) {
            // Successful authentication, redirect to home page.
            res.redirect("/");
        });
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
    getNewPw,
    postNewPw,
    activeNewUser,
    getSelector,
    getAuthenticateByGoogle,
    logout
}