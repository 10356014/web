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
	var storeData;

	//取得使用者輸入的店鋪編號
	var stoNo=req.query.stoNo.trim();
	

    //------------------	
	// 取出店鋪資料
	//------------------
    pool.query('SELECT * FROM store WHERE stoNo=?', [stoNo], function(err, results) {       
        if (results.length==0) {
            res.render('dataNotFound', {});
			return;
        }else{
			storeData=results;
			res.render('storeNewDataForm', {moment:moment, storeData:storeData});
		}
	});
});
module.exports = router;


