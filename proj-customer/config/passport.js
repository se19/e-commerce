const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const bcrypt = require('bcrypt');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const passportConfig = () => {
    passport.initialize();
    passport.session();

    passport.use(new localStrategy(
        (username, password, done) => { //các tên - name trường cần nhập, đủ tên trường thì Done 
            User.findOne({
                    username: username
                })
                .then(user => {
                    if (user && user.available == false) {
                        //req.flash('error', 'Tài khoản đã bị khóa.');
                        console.log('USER HAS BEEN LOOKED');
                        return done(null, false)
                    } else if (user) {
                        bcrypt.compare(password, user.password, function (err, res) {
                            if (res === true) {
                                return done(null, user)
                            } else {
                                //req.flash('error', 'Sai tài khoản hoặc mật khẩu');
                                console.log('PASSWORD FAILED');
                                return done(null, false)
                            }
                        });
                    } else {
                        //req.flash('error', 'Sai tài khoản hoặc mật khẩu');
                        console.log('NOT FOUND USER');
                        return done(null, false);
                    }
                })
                .catch(err => console.log(err));
        }))

    // Khai báo serial mã hóa dữ liệu để có thể lưu trữ user vào session
    passport.serializeUser((user, done) => {
        done(null, user)
    })

    //Giải mã
    passport.deserializeUser((user, done) => {
        User.findOne({
                _id: user._id
            })
            .then(userRes => {
                if (userRes) {
                    return done(null, userRes)
                } else {
                    //req.flash('error', 'Sai tài khoản hoặc mật khẩu');
                    console.log('NOT FOUND USER');
                    return done(null, false)
                }
            })
            .catch(err => console.log(err));
    })
}

passport.use(new GoogleStrategy({
        clientID: "693368048261-8bjpidfh4437vpdf1aabrvltahco1d3a.apps.googleusercontent.com",
        clientSecret: "jIf0w4oUsQg8UyuJwMkOVO2X",
        callbackURL: "http://localhost:3000/auth/google/ecommerce",
        userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
    },
    function (accessToken, refreshToken, profile, cb) {
        //console.log(profile);

        // do lỡ đặt trong model là require true, có gì lát sửa
        User.findOrCreate({
            googleId: profile.id,
            userType: "customer",
            available: true
        }, function (err, user) {
            if (!user.name) {
                user.name = profile.displayName;
                user.DateCreated = new Date();
                user.save()
                    .then(result => {
                        // in ra gì đó
                    }).catch(err => {
                        //req.flash('error', 'Lỗi');
                    });
            }
            return cb(err, user);
        });
    }
));

module.exports = passportConfig;