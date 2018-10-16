var express = require('express');
var router = express.Router();
var mysql = require('mysql');

//----------------------
// 引用db.js
//----------------------
var pool = require('./lib/db.js');

/* GET home page. */
router.get('/', function(req, res, next) {
    var storeData;

    //------------------	
	// 先取出店鋪資料
	//------------------
    pool.query('select * from store', function(err, results) {       
        if (err) {
            storeData=[];
        }else{
            storeData=results;
        }
        //------------------------------------------   
        // 將店鋪資料一起送給輸入表單
        //------------------------------------------
        res.render('robotAddForm', {storeData:storeData});
    }); 
});

module.exports = router;