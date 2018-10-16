var express = require('express');
var router = express.Router();
var mysql = require('mysql');

//----------------------
// 引用db.js
//----------------------
var pool = require('./lib/db.js');
var moment = require('moment');


/* GET home page. */
router.get('/', function(req, res, next) {
	var robotData;
	var storeData;
	//取得使用者輸入的店鋪編號
	var robNo=req.query.robNo.trim();
	

    //------------------	
	// 取出店鋪資料
	//------------------
    pool.query('SELECT * FROM match_robot WHERE robNo=?', [robNo], function(err, results) {       
        if (results.length==0) {
            res.render('dataNotFound', {});
			return;
        }else{
			robotData=results;
			//res.render('robotNewDataForm', {moment:moment, robotData:robotData});
			

		}
	});
	//------------------	
	// 先取出店鋪資料
	//------------------
	pool.query('select * from store', function(err, results) {       
		if (results.length==0) {
			res.render('dataNotFound', {});
			//storeData=[];
			return;
		}else{
			storeData=results;
		}
		//------------------------------------------   
		// 將店鋪資料一起送給輸入表單
		//------------------------------------------
		res.render('robotNewDataForm', {robotData:robotData,storeData:storeData});
	}); 
});
module.exports = router;


