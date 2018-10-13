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
	var designerData;

	//取得使用者輸入的理髮師編號
	var desNo=req.query.desNo.trim();
	

    //------------------	
	// 取出店鋪資料
	//------------------
    pool.query('SELECT * FROM designer WHERE desNo=?', [desNo], function(err, results) {       
        if (results.length==0) {
            res.render('dataNotFound', {});
			return;
        }else{
			designerData=results;
			res.render('designerNewDataForm', {moment:moment, designerData:designerData});
		}
	});
});
module.exports = router;


