const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');

const passport = require('passport');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const flash = require('connect-flash');

//import router config
const indexRouter = require('./routes/index');

//import passport config
const passportConfig = require('./config/passport');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({
  extended: false
}));

// //multer upload img
// const fileStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'public/images/products');
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.originalname);
//   }
// });
// app.use(
//   multer({
//     storage: fileStorage
//   }).single('image')
// );


//config auth. set time out => auto log out
app.use(session({
  secret: 'something',
  cookie: {
    maxAge: (60 * 60 * 1000)
  },
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


//use router
app.use('/', indexRouter);

//use passport config
passportConfig();


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  let isLogin = req.isAuthenticated();
  res.render('common/error', {
    pageTitle: "Không tìm thấy trang!",
    isLogin,
    session: {}
  });
});

module.exports = app;