var express = require('express');
var router = express.Router();
var mysql = require('mysql');

//------------------
// 載入資料庫連結
//------------------
var pool = require('./lib/db.js');



/* GET home page. */
router.get('/', function(req, res) {
	// 取得使用者傳來的參數
	var stoNo=req.param("stoNo");
	var stoName=req.param("stoName");
    var stoCity=req.param("stoCity");
    var stoAddress=req.param("stoAddress");

		
	// 將更改資料
	pool.query('UPDATE store SET stoName=?, stoCity=?, stoAddress=? where stoNo=?', 
		[stoName, stoCity, stoAddress, stoNo], 
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
