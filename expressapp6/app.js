var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var students = require('./routes/students');
var cors = require('cors');
var jwt = require('jsonwebtoken');

var app = express();

app.use(cors({
    origin:['http://localhost:4200','http://127.0.0.1:4200'],
    credentials:true
}));

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/meandb');

// var passport = require('passport');
// var session = require('express-session');

// app.use(session({
//     name:'myname.sid',
//     resave:false,
//     saveUninitialized:false,
//     secret:'secret',
//     cookie:{
//         maxAge:36000000,
//         httpOnly:false,
//         secure:false
//     }
// }));

// require('./passport-config');
// app.use(passport.initialize());
// app.use(passport.session());




// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/students',students);

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
