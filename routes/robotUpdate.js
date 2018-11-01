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
router.get('/', function(req, res) {
	//------------------------------------------
    // 如尚未登入, 轉至未登入頁面
    //------------------------------------------
    if(!authorize.isPass(req)){
        res.render(authorize.illegalURL, {});
        return;
    }
    //------------------------------------------
	// 取得使用者傳來的參數
	var robNo=req.param("robNo");
	var robState=req.param("robState");
    var match_stoNo=req.param("match_stoNo");

		
	// 將更改資料
	pool.query('UPDATE match_robot SET robState=?, match_stoNo=? where robNo=?', 
		[robState, match_stoNo, robNo], 
		function(err, rows, results) {
			if (err){					
				res.render('updateFail', {});     //導向更改失敗頁面
			}else{
				res.render('updateSuccess', {});  //導向更改成功頁面
			}	
		}
	)
});

module.exports = router;
