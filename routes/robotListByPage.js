var express = require('express');
var router = express.Router();
var mysql = require('mysql');
//----------------------------------------------------
// 透過require引用db.js的pool物件,
// 即使多個程式均引用, 在系統中只有一份pool物件.
//----------------------------------------------------
var pool = require('./lib/db.js');

var startPage=1;
var linePerPage=15; 
var navSegments=10;

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
    
    var pageNo=parseInt(req.param('pageNo'));

    //--------------------------
    // 如果輸入參數不是數字
    //--------------------------
    if(isNaN(pageNo)){
        pageNo=1;
    }

    //--------------------------
    // 如果輸入參數小於1
    //--------------------------
    if(pageNo<1){
        pageNo=1;
    }

    //-----------------------
    // 如果點了上一個區段
    //-----------------------
    if(pageNo<startPage){
        startPage=startPage-navSegments;
    }

    //-----------------------
    // 如果點了下一個區段
    //-----------------------   
    if(pageNo>=(startPage+navSegments)){
        startPage=startPage+navSegments;
    }

    pool.query('select count(*) as cnt from match_robot', function(err, results) {
        if (err)throw err;

        var totalLine=results[0].cnt;
        var totalPage=Math.ceil(totalLine/linePerPage);

        pool.query('select * from match_robot limit ?, ?',[(pageNo-1)*linePerPage, linePerPage], function(err, results) {
            if (err) {
                res.render('robotNotFound', {});
            }

            if(results.length==0){
                res.render('robotNotFound', {});
            }else{
                var recordNo=(pageNo-1)*linePerPage+1;
                res.render('robotListByPage', {data:results, pageNo:pageNo, totalLine:totalLine, totalPage:totalPage, startPage:startPage, linePerPage:linePerPage, navSegments:navSegments});
            }
        }); 
    }); 
});

module.exports = router;