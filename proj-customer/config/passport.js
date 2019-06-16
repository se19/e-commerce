const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const bcrypt = require('bcrypt');

const passportConfig = () => {
    passport.initialize();
    passport.session();

    passport.use(new localStrategy(
        (username, password, done) => { //các tên - name trường cần nhập, đủ tên trường thì Done 
            User.findOne({
                    username: username
                })
                .then(user => {
                    if (user.available === false) {
                        console.log('USER HAS BEEN LOOKED');
                        return done(null, false)
                    } else if (user) {
                        bcrypt.compare(password, user.password, function (err, res) {
                            if (res === true) {
                                return done(null, user)
                            } else {
                                console.log('PASSWORD FAILED');
                                return done(null, false)
                            }
                        });
                    } else {
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
                    console.log('NOT FOUND USER');
                    return done(null, false)
                }
            })
            .catch(err => console.log(err));
    })
}

module.exports = passportConfig;