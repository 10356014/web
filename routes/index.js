var express = require('express');
var router = express.Router();

/*
/* GET home page. 
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
*/
/* GET home page. */
/*
router.get('/', function(req, res, next) {
  res.render('index', {page:'index', menuId:'index'});
});
router.get('/', function(req, res, next) {
  res.render('storeListByPage', {page:'/storeListByPage', menuId:'/storeListByPage'});
});
router.get('/', function(req, res, next) {
  res.render('designerListByPage', {page:'/designerListByPage', menuId:'/designerListByPage'});
});
router.get('/', function(req, res, next) {
  res.render('robotListByPage', {page:'robotListByPage', menuId:'robotListByPage'});
});

router.get('/contact', function(req, res, next) {
  res.render('contact', {page:'Contact Us', menuId:'contact'});
});
*/

//----------------------------------------------
// 載入使用權檢查
//----------------------------------------------
var authorize = require('./lib/authorize.js');
//----------------------------------------------


/* GET home page. */
router.get('/', function(req, res, next) {	
    //------------------------------------------
    // 如尚未登入, 轉至未登入頁面
    //------------------------------------------
    if(!authorize.isPass(req)){
        res.render(authorize.illegalURL, {});
        return;
    }
    //------------------------------------------

    res.render('index', {userNo:req.session.userNo, userName:req.session.userName});
    //res.render('index', {empName:req.session.empName});
});

module.exports = router;
