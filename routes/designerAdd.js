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
    var desNo=req.param("desNo");
    var desName=req.param("desName");
    var desID=req.param("desID");
    var birthday=req.param("birthday");
    var desAddress=req.param("desAddress");

    //建立一個新資料物件
    var newData={
        desNo:desNo,
        desName:desName,
        desID:desID,
        birthday:birthday,
        desAddress:desAddress
    }	
	
    pool.query('INSERT INTO designer SET ?', newData, function(err, rows, fields) {
        if (err){
            res.render('designerAddFail', {});     //新增失敗
        }else{
            res.render('designerAddSuccess', {});  //新增成功
        }
    });
});

module.exports = router;