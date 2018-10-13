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
//登入
var loginForm = require('./routes/loginForm');
var login = require('./routes/login');
var logout = require('./routes/logout');
var loginSuccess = require('./routes/loginSuccess');

//店鋪
var storeListByPage = require('./routes/storeListByPage');
var storeAddForm = require('./routes/storeAddForm');
var storeAdd = require('./routes/storeAdd');
var storeDelete = require('./routes/storeDelete');
var storeNewDataForm = require('./routes/storeNewDataForm');
var storeUpdate = require('./routes/storeUpdate');

//理髮師
var designerListByPage = require('./routes/designerListByPage');
var designerAddForm = require('./routes/designerAddForm');
var designerAdd = require('./routes/designerAdd');
var designerDelete = require('./routes/designerDelete');
var designerNewDataForm = require('./routes/designerNewDataForm');
var designerUpdate = require('./routes/designerUpdate');

//機器人
var robotListByPage = require('./routes/robotListByPage');
//打卡
var attendanceListByPage = require('./routes/attendanceListByPage');

//-------------------------------------------------------

var app = express();
//-----------------------------------------
// 增加使用session及uuid
//-----------------------------------------
var session=require('express-session');
var uuid=require('uuid');

app.use(session({
    genid:function(req){
        return uuid.v1();
    },
    secret: 'secretcode',
    resave: true,
    saveUninitialized: true
}));
//-----------------------------------------

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
//登入
app.use('/loginForm', loginForm);
app.use('/login', login);
app.use('/logout', logout);
app.use('/loginSuccess', loginSuccess);

//店鋪
app.use('/storeListByPage', storeListByPage);
app.use('/storeAddForm', storeAddForm);
app.use('/storeAdd', storeAdd);
app.use('/storeDelete', storeDelete);
app.use('/storeNewDataForm', storeNewDataForm);
app.use('/storeUpdate', storeUpdate);


//理髮師
app.use('/designerListByPage', designerListByPage);
app.use('/designerAddForm', designerAddForm);
app.use('/designerAdd', designerAdd);
app.use('/designerDelete', designerDelete);
app.use('/designerNewDataForm', designerNewDataForm);
app.use('/designerUpdate', designerUpdate);


//機器人
app.use('/robotListByPage', robotListByPage);
//打卡查詢
app.use('/attendanceListByPage', attendanceListByPage);

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