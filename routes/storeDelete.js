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
	
	//刪除資料庫內容
    pool.query('DELETE FROM store where stoNo=?', [stoNo], function(err, rows, fields) {
        if (err){
            res.render('deleteFail', {});     //刪除失敗
        }else{
            res.render('deleteSuccess', {});  //刪除成功
        }
    });
});

module.exports = router;