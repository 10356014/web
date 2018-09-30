var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

//-------------------------------------------------------
// 增加以下的require
//-------------------------------------------------------
var storeListByPage = require('./routes/storeListByPage');
var designerListByPage = require('./routes/designerListByPage');
var robotListByPage = require('./routes/robotListByPage');

var storeAddForm = require('./routes/storeAddForm');
var storeAdd = require('./routes/storeAdd');

//-------------------------------------------------------

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

app.get('/', function(req, res) {  
    res.render('index', {  
     title: '首頁'
    });  
});  


//-------------------------------------------------------
// 增加以下的app.use()
//-------------------------------------------------------
app.use('/', index);
app.use('/storeListByPage', storeListByPage);
app.use('/designerListByPage', designerListByPage);
app.use('/robotListByPage', robotListByPage);

app.use('/storeAddForm', storeAddForm);
app.use('/storeAdd', storeAdd);

//-------------------------------------------------------

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;