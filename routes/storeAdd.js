var express = require('express');
var router = express.Router();
var mysql = require('mysql');

//------------------
// 載入資料庫連結
//------------------
var pool = require('./lib/db.js');


/* GET home page. */
router.get('/', function(req, res, next) {
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
            res.render('storeAddFail', {});     //新增失敗
        }else{
            res.render('storeAddSuccess', {});  //新增成功
        }
    });
});

module.exports = router;