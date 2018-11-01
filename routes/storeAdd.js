var express = require('express');
var router = express.Router();
var mysql = require('mysql');

//------------------
// 載入資料庫連結
//------------------
var pool = require('./lib/db.js');

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
    //取得使用者傳來的參數
    var stoNo=req.param("stoNo");
    var stoCity=req.param("stoCity");
    var stoAddress=req.param("stoAddress");
    var stoName=req.param("stoName");
    
    //建立一個新資料物件
    var newData={
        stoNo:stoNo,
        stoCity:stoCity,
        stoAddress:stoAddress,
        stoName:stoName
    }	
	
    pool.query('INSERT INTO store SET ?', newData, function(err, rows, fields) {
        if (err){
            res.render('addFail', {});     //新增失敗
        }else{
            res.render('addSuccess', {});  //新增成功
        }
    });
});

module.exports = router;